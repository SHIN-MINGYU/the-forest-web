import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  Operation,
  split,
  from,
  InMemoryCache,
} from "@apollo/client";
import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition, Observable } from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";
import { GraphQLClient, gql } from "graphql-request";
import { getLocalStorage, setLocalStorage } from "./utils/localStorage";
import { GRAPHQL_ENDPOINT, SOCKET_ENDPOINT } from "./utils/loadEnv";

type httpLink = HttpLink | null;
type wsLink = GraphQLWsLink | null;
type splitLink = ApolloLink | null;

const httpLink: httpLink =
  typeof window !== "undefined"
    ? new HttpLink({
        uri: GRAPHQL_ENDPOINT!,
        headers: {
          Authorization: getLocalStorage("accessToken"),
        },
        credentials: "include",
      })
    : null;

const wsLink: wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: SOCKET_ENDPOINT!,
        })
      )
    : null;

const RESTORE_ACCESS_TOKEN = gql`
  mutation restoreAccessToken {
    restoreAccessToken
  }
`;

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err?.message) {
          case "GUEST":
            return undefined;
        }
        switch (err?.extensions?.code) {
          case "UNAUTHENTICATED":
            return new Observable((observer) => {
              const graphQLClient = new GraphQLClient(GRAPHQL_ENDPOINT!, {
                credentials: "include",
              });
              graphQLClient
                .request(RESTORE_ACCESS_TOKEN)
                .then((res) => {
                  setLocalStorage("accessToken", res.restoreAccessToken);

                  operation.setContext({
                    headers: {
                      ...operation.getContext().headers,
                      Authorization: res.restoreAccessToken,
                    },
                  });
                  const subscriber = {
                    next: observer.next.bind(observer),
                    error: observer.error.bind(observer),
                    complete: observer.complete.bind(observer),
                  };
                  forward(operation).subscribe(subscriber);
                })
                .catch((err) => observer.error(err));
            });
        }
      }
    }
    console.log(networkError?.name);
    if (networkError) {
      console.log(`[Network error] : ${networkError} `);
    }
  }
);

const splitLink: splitLink =
  typeof window !== "undefined"
    ? split(
        ({ query }: Operation) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink!,
        httpLink!
      )
    : null;

const client = new ApolloClient({
  link:
    typeof window !== "undefined" ? from([errorLink, splitLink!]) : errorLink,
  cache: new InMemoryCache(),
});

export default client;

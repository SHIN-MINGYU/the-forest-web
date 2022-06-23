import {
  ApolloClient,
  ApolloClientOptions,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  Operation,
  split,
} from "@apollo/client";
import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";

type wsLink = GraphQLWsLink | null;
type splitLink = ApolloLink | undefined;

const httpLink: HttpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

const wsLink: wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: "ws://localhost:4000/subscriptions",
        })
      )
    : null;

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
        httpLink
      )
    : httpLink;

const client: ApolloClient<ApolloClientOptions<InMemoryCache>> =
  new ApolloClient<ApolloClientOptions<InMemoryCache>>({
    link: splitLink,
    cache: new InMemoryCache(),
  } as ApolloClientOptions<any>);

export default client;

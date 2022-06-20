import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

const client = new ApolloClient<any>({
  link: from([httpLink]),
  cache: new InMemoryCache(),
} as any);
console.log(client);

export default client;

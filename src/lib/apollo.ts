import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const link = createHttpLink({
  uri: "http://localhost:3000/graphql",
  credentials: "include",
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export { client };

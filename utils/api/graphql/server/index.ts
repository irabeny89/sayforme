import { ApolloServer } from "apollo-server-micro";
import typeDefs from "./typeDefs";

const apolloServer = new ApolloServer({
  typeDefs,
  mocks: true,
});

export default apolloServer;

import { ApolloServer } from "apollo-server-micro";
import context from "./context";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context
});

export default apolloServer;

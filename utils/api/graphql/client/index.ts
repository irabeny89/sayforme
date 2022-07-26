import { ApolloClient } from "@apollo/client";
import { appData } from "config";
import cache from "./cache";
import link from "./link";

const { appName: name, version } = appData;

const client = new ApolloClient({
  name,
  version,
  cache,
  link,
});

export default client
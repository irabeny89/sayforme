import { from, HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import { setContext } from "@apollo/client/link/context";
import { SAYFORMETOKEN } from "config";

const errorLink = onError(({ graphQLErrors, networkError }) => {
    networkError &&
      console.error(
        "Network Error: %s | %s | %s",
        networkError.cause,
        networkError.message,
        networkError.name
      );
    graphQLErrors && console.error("GraphQL Error:", graphQLErrors);
  }),
  httpLink = new HttpLink({
    uri: "api/graphql",
  }),
  authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(SAYFORMETOKEN),
      authorization = token ? `Bearer ${token}` : "";
    return { headers: { ...headers, authorization } };
  }),
  link = from([errorLink, new RetryLink(), authLink, httpLink]);

export default link;

import { from, HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import { setContext } from "@apollo/client/link/context";
import { SAYFORME_TOKEN_KEY } from "config";

const errorLink = onError(({ graphQLErrors, networkError }) => {
    networkError && console.error("Network Error:", networkError);
    graphQLErrors && console.error("GraphQL Error:", graphQLErrors);
  }),
  httpLink = new HttpLink({
    uri: "/api/graphql",
  }),
  authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(SAYFORME_TOKEN_KEY),
      authorization = token ? `Bearer ${token}` : "";
    return { headers: { ...headers, authorization } };
  }),
  link = from([errorLink, new RetryLink(), authLink, httpLink]);

export default link;

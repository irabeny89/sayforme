import { from, HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";

const errorLink = onError(({ graphQLErrors, networkError }) => {
    networkError && console.error("Network Error:", networkError);
    graphQLErrors && console.error("GraphQL Error:", graphQLErrors);
  }),
  httpLink = new HttpLink({
    uri: "api/graphql",
  }),
  link = from([errorLink, new RetryLink(), httpLink]);

export default link;

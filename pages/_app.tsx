import type { AppProps } from "next/app";
import Layout from "utils/components/layout";
import ErrorBoundary from "utils/components/ErrorBoundary";
import { ApolloProvider } from "@apollo/client";
import client from "utils/api/graphql/client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </ErrorBoundary>
  );
}

export default MyApp;

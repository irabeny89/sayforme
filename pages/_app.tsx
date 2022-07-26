import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "utils/components/Layout";
import ErrorBoundary from "utils/components/ErrorBoundary";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ErrorBoundary>
  );
}

export default MyApp;

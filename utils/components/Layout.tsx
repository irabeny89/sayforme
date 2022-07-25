import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useRouter } from "next/router";
import Head from "next/head";
import getPageName from "utils/getPageName";

type LayoutProps = { children: ReactNode };

export default function Layout({ children }: LayoutProps) {
  const pageName = getPageName(useRouter().pathname);
  return (
    <main>
      <Head>
        <title>{pageName}</title>
      </Head>
      <Header />
      {children}
      <Footer />
    </main>
  );
}

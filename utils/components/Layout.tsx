import { ReactNode, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useRouter } from "next/router";
import Head from "next/head";
import getPageName from "utils/getPageName";
import { SAYFORMETOKEN } from "config";
import { verify } from "jsonwebtoken";
import { envVariables } from "config";

type LayoutProps = { children: ReactNode };

export default function Layout({ children }: LayoutProps) {
  const router = useRouter(),
    pageName = getPageName(router.asPath),
    handleLogout = () => (
      localStorage.removeItem(SAYFORMETOKEN), router.push("/")
    );

  useEffect(() => {
    const isProtected = ["BOOKINGS", "USERS"].includes(pageName);
    const token = localStorage.getItem(SAYFORMETOKEN);
    isProtected &&
      (!token
        ? router.push("/")
        : !verify(token, envVariables.tokenSecret) && router.push("/"));
  }, [pageName]);

  return (
    <main>
      <Head>
        <title>{pageName}</title>
      </Head>
      <Header />
      <button onClick={handleLogout}>Logout</button>
      {children}
      <Footer />
    </main>
  );
}

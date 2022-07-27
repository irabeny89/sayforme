import { ReactNode, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useRouter } from "next/router";
import Head from "next/head";
import getPageName from "utils/getPageName";
import { SAYFORMETOKEN } from "config";
import { verify } from "jsonwebtoken";
import { envVariables } from "config";
import { tokenVar } from "utils/api/graphql/client/reactiveVariables";
import { useReactiveVar } from "@apollo/client";

type LayoutProps = { children: ReactNode };

export default function Layout({ children }: LayoutProps) {
  const router = useRouter(),
    pageName = getPageName(router.asPath),
    handleLogout = () => (
      localStorage.removeItem(SAYFORMETOKEN), tokenVar(""), router.push("/")
    ),
    token = useReactiveVar(tokenVar);

  useEffect(() => {
    const isProtected = ["BOOKINGS", "USERS"].includes(pageName);
    const token = localStorage.getItem(SAYFORMETOKEN);
    // if token exists, set on global state
    token && tokenVar(token);
    isProtected &&
      (!token
        ? router.push("/")
        : !verify(token, envVariables.tokenSecret) && router.push("/"));
  }, [pageName, token]);

  return (
    <main>
      <Head>
        <title>{pageName}</title>
      </Head>
      <Header />
      {token && <button onClick={handleLogout}>Logout</button>}
      {children}
      <Footer />
    </main>
  );
}

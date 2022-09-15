import { ReactNode, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useRouter } from "next/router";
import Head from "next/head";
import getPageName from "utils/getPageName";
import { SAYFORMETOKEN } from "config";
import {
  tokenPayloadVar,
  tokenVar,
} from "utils/api/graphql/client/reactiveVariables";
import { useReactiveVar } from "@apollo/client";
import verifyJwtToken from "utils/verifyJwtToken";

type LayoutProps = { children: ReactNode };

export default function Layout({ children }: LayoutProps) {
  const router = useRouter(),
    pageName = getPageName(router.asPath),
    handleLogout = () => (
      localStorage.removeItem(SAYFORMETOKEN),
      tokenVar(""),
      router.push("/").then(() => location.reload())
    ),
    token = useReactiveVar(tokenVar);

  useEffect(() => {
    // if current page name is a protected page
    const isProtected = ["BOOKINGS", "USERS"].includes(pageName),
      token = localStorage.getItem(SAYFORMETOKEN),
      verifiedPayload = verifyJwtToken(token);
    // if valid token exists, set on global state
    tokenVar(token ?? "");
    // update global state if payload exist
    tokenPayloadVar(verifiedPayload as SignAndGetTokenT | undefined | null);
    // redirect to home page for unauth users
    isProtected && !verifiedPayload && router.push("/");
  }, [pageName, token, router]);

  return (
    <main className="font-sfpro">
      <Head>
        <title>{pageName}</title>
      </Head>
      <Header />
      {token && <button onClick={handleLogout}>Logout</button>}
      <br />
      {children}
      <br />
      <Footer />
    </main>
  );
}

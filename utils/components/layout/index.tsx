import { ReactNode, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useRouter } from "next/router";
import Head from "next/head";
import getPageName from "utils/getPageName";
import { SAYFORMETOKEN } from "config";
import {
  themeVar,
  tokenPayloadVar,
  tokenVar,
} from "utils/api/graphql/client/reactiveVariables";
import { useReactiveVar } from "@apollo/client";
import verifyJwtToken from "utils/verifyJwtToken";
import { MdLightMode, MdDarkMode } from "react-icons/md";

type LayoutProps = { children: ReactNode };

export default function Layout({ children }: LayoutProps) {
  const router = useRouter(),
    pageName = getPageName(router.asPath),
    theme = useReactiveVar(themeVar),
    isLightMode = theme === "light",
    token = useReactiveVar(tokenVar),
    themeBtnClassName = `shadow p-1 float-right mr-2 ${
      isLightMode ? "bg-base-content text-white" : "text-warning bg-slate-100"
    }`,
    handleLogout = () => (
      localStorage.removeItem(SAYFORMETOKEN),
      tokenVar(""),
      router.push("/").then(() => location.reload())
    ),
    toggleTheme = () => themeVar(theme === "light" ? "halloween" : "light");

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
    <main
      data-theme={theme}
      className="font-sfpro bg-base-200 text-base-content"
    >
      <Head>
        <title>{pageName}</title>
      </Head>
      <Header />
      <button onClick={toggleTheme} className={themeBtnClassName}>
        {isLightMode ? <MdDarkMode size="20" /> : <MdLightMode size="20" />}
      </button>
      {token && <button onClick={handleLogout}>Logout</button>}
      <br />
      {children}
      <br />
      <Footer />
    </main>
  );
}

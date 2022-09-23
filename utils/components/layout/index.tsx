import { ReactNode, useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useRouter } from "next/router";
import Head from "next/head";
import getPageName from "utils/getPageName";
import { SAYFORME_TOKEN_KEY, SAYFORME_THEME_KEY } from "config";
import {
  tokenPayloadVar,
  tokenVar,
} from "utils/api/graphql/client/reactiveVariables";
import { useReactiveVar } from "@apollo/client";
import verifyJwtToken from "utils/verifyJwtToken";
import { MdLightMode, MdDarkMode } from "react-icons/md";

type LayoutProps = { children: ReactNode };

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const pageName = getPageName(router.asPath);
  const [theme, setTheme] = useState<null | string>();
  const isLightMode = theme === "light";
  const token = useReactiveVar(tokenVar);
  const themeBtnClassName = `shadow p-1 float-right mr-2 ${
    isLightMode ? "bg-base-content text-white" : "text-warning bg-slate-100"
  }`;
  const handleLogout = () => (
    localStorage.removeItem(SAYFORME_TOKEN_KEY),
    tokenVar(""),
    router.push("/").then(() => location.reload())
  );
  /**
   * Toggle themes between `halloween` and `light` and stores it in `localStorage`.
   */
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "halloween" : "light";
    setTheme(newTheme);
    localStorage.setItem(SAYFORME_THEME_KEY, newTheme);
  };
  // handle page protection
  useEffect(() => {
    // if current page name is a protected page
    const isProtected = ["BOOKINGS", "USERS"].includes(pageName),
      token = localStorage.getItem(SAYFORME_TOKEN_KEY),
      verifiedPayload = verifyJwtToken(token);
    // if valid token exists, set on global state
    tokenVar(token ?? "");
    // update global state if payload exist
    tokenPayloadVar(verifiedPayload as SignAndGetTokenT | undefined | null);
    // redirect to home page for unauth users
    isProtected && !verifiedPayload && router.push("/");
  }, [pageName, token, router]);

  // handle theme settings
  useEffect(() => {
    setTheme(localStorage.getItem(SAYFORME_THEME_KEY));
  }, []);

  return (
    <main
      data-theme={theme}
      className="font-sfpro bg-base-200 text-base-content px-5"
    >
      <Head>
        <title>{pageName}</title>
      </Head>
      <Header />
      <button onClick={toggleTheme} className={themeBtnClassName}>
        {isLightMode ? <MdDarkMode size="20" /> : <MdLightMode size="20" />}
      </button>
      {token && (
        <button
          onClick={handleLogout}
          className="btn btn-xs bg-error border-0 shadow-md"
        >
          Logout
        </button>
      )}
      <br />
      {children}
      <br />
      <Footer />
    </main>
  );
}

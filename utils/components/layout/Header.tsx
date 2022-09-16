import Link from "next/link";
import { appData } from "config";
import { useReactiveVar } from "@apollo/client";
import { tokenPayloadVar } from "utils/api/graphql/client/reactiveVariables";
import usePageTitle from "utils/hooks/usePageTitle";

const { appName, pages, adminAccessPages, userPrivatePages, publicPages } =
  appData;

export default function Header() {
  const payload = useReactiveVar(tokenPayloadVar);
  const isAdmin = payload?.role === "ADMIN";
  const isUser = payload?.email;
  const currentPageTitle = usePageTitle();
  const commonClassName = "hover:bg-white cursor-pointer p-1";
  const getTabClassName = (title: string) =>
    currentPageTitle === title.toUpperCase()
      ? commonClassName + " border-b-2 border-secondary"
      : commonClassName;
  const confirmUserAccess = (title: string) =>
    (adminAccessPages.includes(title) && isAdmin) ||
    (userPrivatePages.includes(title) && isUser);
    
  return (
    <header className="p-3 flex justify-between">
      <h1>
        <Link href="/">{appName}</Link>
      </h1>
      <nav>
        <ul className="flex gap-2">
          {pages.map(({ route, title }) =>
            confirmUserAccess(title) ? (
              <Link key={title} href={route}>
                <li className={getTabClassName(title)}>{title}</li>
              </Link>
            ) : (
              publicPages.includes(title) && (
                <Link key={title} href={route}>
                  <li className={getTabClassName(title)}>{title}</li>
                </Link>
              )
            )
          )}
        </ul>
      </nav>
    </header>
  );
}

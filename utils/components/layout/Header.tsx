import Link from "next/link";
import { appData } from "config";
import { useReactiveVar } from "@apollo/client";
import { tokenPayloadVar } from "utils/api/graphql/client/reactiveVariables";
import usePageTitle from "utils/hooks/usePageTitle";
import { MdMenu } from "react-icons/md";
import { GiNothingToSay } from "react-icons/gi";
import useToggle from "utils/hooks/useToggle";

const { appName, pages, adminAccessPages, userPrivatePages, publicPages } =
  appData;

export default function Header() {
  const payload = useReactiveVar(tokenPayloadVar);
  const isAdmin = payload?.role === "ADMIN";
  const isUser = payload?.email;
  const currentPageTitle = usePageTitle();
  const commonClassName = "hover:bg-white cursor-pointer p-1";
  const { toggleFlag, toggler } = useToggle();
  const menuBtnClassName = `sm:hidden transition-all duration-100 ml-auto my-2 ${
    toggleFlag ? "rotate-90" : ""
  }`;
  const getTabClassName = (title: string) =>
    currentPageTitle === title.toUpperCase()
      ? commonClassName + " border-b-2 border-secondary"
      : commonClassName;
  const confirmUserAccess = (title: string) =>
    (adminAccessPages.includes(title) && isAdmin) ||
    (userPrivatePages.includes(title) && isUser);

  return (
    <header className="py-5 flex justify-between">
      <h1 className="text-2xl font-bold">
        <Link href="/">
          <>
            <GiNothingToSay /> {appName}
          </>
        </Link>
      </h1>
      <nav className="relative">
        <MdMenu size={20} onClick={toggler} className={menuBtnClassName} />
        {toggleFlag && (
          <ul className="sm:flex absolute z-10 bg-base-300 sm:bg-inherit right-0 sm:static w-32 sm:w-auto space-y-3 sm:space-y-0 p-2 sm:p-0 gap-3">
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
        )}
      </nav>
    </header>
  );
}

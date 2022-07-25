/**
 * Dynamically derives page name from the route/path name
 * @param pathname the current page route/path name
 * @returns uppercase of the route/path name
 */
export default function getPageName(pathname: string) {
  if (pathname === "/") return "HOME";
  return pathname.slice(1).toUpperCase();
}

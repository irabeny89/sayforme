import { useRouter } from "next/router";
import getPageName from "utils/getPageName";
/**
 * This hook returns an uppercase page name that can be used for web page tab titles.
 * @returns uppercase page name
 */
export default function usePageTitle() {
  return getPageName(useRouter().asPath);
}

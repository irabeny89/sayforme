import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Users from "utils/components/users";

const User = dynamic(() => import("utils/components/users/User"));

export default function UserRoutes() {
  const { query } = useRouter(),
    routeHasQueryParams = Object.keys(query).length;
  return !routeHasQueryParams ? <Users /> : <User />;
}

import { useRouter } from "next/router";
import Users from "utils/components/users";
import User from "utils/components/users/User";

export default function UserRoutes() {
  const { query } = useRouter(),
  routeHasQueryParams = Object.keys(query).length
  return !routeHasQueryParams ? <Users /> : <User />;
}

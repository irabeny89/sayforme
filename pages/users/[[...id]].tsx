import { useRouter } from "next/router";
import Users from "utils/components/bookings/users";
import User from "utils/components/bookings/users/User";

export default function UserRoutes() {
  const { query } = useRouter();
  return !Object.keys(query).length ? <Users /> : <User />;
}

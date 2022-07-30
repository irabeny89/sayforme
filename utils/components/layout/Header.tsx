import Link from "next/link";
import { appData } from "config";
import { useReactiveVar } from "@apollo/client";
import { tokenPayloadVar } from "utils/api/graphql/client/reactiveVariables";

const { appName } = appData;

export default function Header() {
  const payload = useReactiveVar(tokenPayloadVar),
    isAdmin = payload?.role === "ADMIN";

  return (
    <header>
      <h1>
        <Link href="/">{appName}</Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/register">Register</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
          {isAdmin && (
            <li>
              <Link href="/users">Users</Link>
            </li>
          )}
          {payload?.email && (
            <li>
              <Link href="/bookings">Bookings</Link>
            </li>
          )}
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

import Link from "next/link";
import { appData } from "config";

const { appName } = appData;

export default function Header() {
  return (
    <header>
      <h1>{appName}</h1>
      <nav>
        <ul>
          <Link href="/">
            <li>Home</li>
          </Link>
          <Link href="/register">
            <li>Register</li>
          </Link>
          <Link href="/login">
            <li>Login</li>
          </Link>
          <Link href="/admin">
            <li>Admin</li>
          </Link>
          <Link href="/bookings">
            <li>Bookings</li>
          </Link>
          <Link href="/about">
            <li>About</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}

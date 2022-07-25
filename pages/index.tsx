import type { NextPage } from "next";
import { appData } from "config";
import Link from "next/link";

const { intro } = appData;

const Home: NextPage = () => {
  return (
    <div>
      <h2>Introduction</h2>
      <p>{intro[0]}</p>
      <div>
        <Link href="/register">Register</Link> or{" "}
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
};

export default Home;

import type { NextPage } from "next";
import { appData } from "config";
import Link from "next/link";

const { intro } = appData;

const Home: NextPage = () => {
  return (
    <div className="min-h-screen mt-10 space-y-10">
      <h2 className="text-xl underline">Introduction</h2>
      <p>{intro[0]}</p>
      <div className="flex gap-2">
        <div className="underline">
          <Link href="/register">Register</Link>
        </div>
        |
        <div className="underline">
          <Link href="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

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
        <div>
          <Link href="/register">
            <button>Register</button>
          </Link>
        </div>
        <div>
          <Link href="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

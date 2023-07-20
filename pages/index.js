import Head from "next/head";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  const { isLoading, error, user } = useUser();

  return (
    <div>
      <Head>
        <title>Next JS ChatGPT Starter</title>
      </Head>
      <h1>Welcome to the Next JS &amp; ChatGPT Starter</h1>
      <div>
        {!!user && <Link href="/api/auth/logout">Logout</Link>}
        {!user && <Link href="/api/auth/login">Login</Link>}
      </div>
    </div>
  );
}

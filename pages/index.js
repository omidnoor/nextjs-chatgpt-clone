import Head from "next/head";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getSession } from "@auth0/nextjs-auth0";

export default function Home() {
  const { isLoading, error, user } = useUser();

  return (
    <>
      <Head>
        <title>MemoAI - Login or Signup</title>
      </Head>
      <div className="flex min-h-screen w-full items-center justify-center gap-2 bg-gray-800 text-center text-white">
        <div>
          {!!user && <Link href="/api/auth/logout">Logout</Link>}
          {!user && (
            <>
              <Link href="/api/auth/login" className="btn">
                Login
              </Link>
              <Link href="/api/auth/signup" className="btn">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx.req, ctx.res);
  if (!!session) {
    return {
      redirect: {
        destination: "/chat",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

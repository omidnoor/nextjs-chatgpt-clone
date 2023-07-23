import Head from "next/head";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getSession } from "@auth0/nextjs-auth0";
import { BsRobot } from "react-icons/bs";

export default function Home() {
  const { isLoading, error, user } = useUser();

  return (
    <>
      <Head>
        <title>MemoAI - Login or Signup</title>
      </Head>
      <div className="flex min-h-screen w-full items-center justify-center gap-2 bg-gray-800 text-center text-white">
        <div className="">
          <div className="mb-2 flex items-center justify-center">
            <BsRobot size={70} className="p-1 text-emerald-200" />
          </div>
          <h1 className="mb-2 text-4xl font-bold">Welcom to MemoAI</h1>
          <p className="mt-2 text-lg">Log in with your accoutn to continue</p>
          <div className="mt-4 flex justify-center gap-3">
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

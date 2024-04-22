import Head from "next/head";
import "../styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Head>
        <link rel="icon" href="/samantha.jpg" />
      </Head>
      <main className={`${outfit.variable} font-body`}>
        <Component {...pageProps} />
      </main>
    </UserProvider>
  );
}

export default App;

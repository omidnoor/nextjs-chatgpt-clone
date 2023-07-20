import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>New ChatGPT</title>
      </Head>
      <div className="grid h-screen grid-cols-[260px_1fr]">
        <div>Sidebar</div>
        <div className="flex flex-col bg-gray-700">
          <div className="flex flex-1 flex-col">chat window</div>
          <footer className=" bg-gray-800 p-10">footer</footer>
        </div>
      </div>
    </>
  );
}

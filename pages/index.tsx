import type { NextPage } from "next";
import Head from "next/head";
import { RefObject, useEffect, useRef } from "react";
import { BsPeople } from "react-icons/bs";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const videoRef: RefObject<HTMLVideoElement> = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  return (
    <div className="overflow-x-hidden">
      <Head>
        <title>The Forest</title>
        <meta name="description" content="main page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={"min-h-screen"}>
        <video
          className="relative min-w-full"
          ref={videoRef}
          loop
          autoPlay
          muted>
          <source src="videos/mainVideo.mp4"></source>
        </video>
        <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
          <div className="text-center">
            <p className="text-white text-5xl">The Forest</p>
            <p className="text-white text-2xl  mt-1">with Stranger</p>
            <button
              onClick={() => {
                router.push(
                  {
                    pathname: "/chat/loading",
                    query: {
                      type: "publiconeonone",
                      myId: sessionStorage.getItem("user"),
                    },
                  },
                  "/chat/loading"
                );
              }}
              className="bg-gradient-to-r  hover:from-green-500 hover:to-green-900 delay-100 mt-4 px-16 py-4 ">
              <span className="text-white font-bold text-2xl">JOIN</span>
            </button>
          </div>
        </div>
        <div className="bg-white dark:bg-black text-black dark:text-white">
          <h1 className="text-3xl font-bold text-center py-6">Public</h1>
          <div className="grid grid-cols-3 grid-flow-col px-2">
            <div className="h-80 px-10">
              <div className="h-full flex flex-col justify-center items-center bg-green-400 rounded-md">
                <BsPeople size={100}></BsPeople>
                <p>Chat with stranger</p>
                <p>1:1 chat</p>
              </div>
            </div>
            <div className="h-80 bg-slate-600 px-3"></div>
            <div className="h-80 bg-slate-800 px-3"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

import type { NextPage } from "next";
import Head from "next/head";
import { RefObject, useRef } from "react";
import { BsPeople, TiGroupOutline, CgScreen } from "@components/icon";
import { useRouter } from "next/router";
import ChatCategoryCard from "@components/Card/ChatCategory";

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
      <main>
        <div className="relative">
          <video className="min-w-full" ref={videoRef} loop autoPlay muted>
            <source src="videos/mainVideo.mp4"></source>
          </video>
          <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
            <div className="text-center">
              <p className="text-white md:text-3xl lg:text-5xl">The Forest</p>
              <p className="text-white md:text-lg lg:text-2xl  mt-1">
                with Stranger
              </p>
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
                <span className="text-white font-bold md:text-lg lg:text-2xl">
                  JOIN
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-black text-black dark:text-white">
          <h1 className="text-3xl font-bold text-center py-6">Public</h1>
          <div className="grid grid-cols-2 grid-flow-col px-2 mb-3">
            <ChatCategoryCard
              Icon={BsPeople}
              cardSize={"56"}
              comment={"Chat with stranger"}
              category={"1 v 1 chat"}
            />
            <ChatCategoryCard
              Icon={TiGroupOutline}
              cardSize={"30"}
              comment={"Chat with strangers"}
              category={"1 v N chat"}
            />
          </div>
          <h1 className="text-3xl font-bold text-center py-6">Private</h1>
          <div className="grid grid-cols-3 grid-flow-col px-2 mb-3">
            <ChatCategoryCard
              Icon={BsPeople}
              cardSize={"30"}
              comment={"Chat with freind"}
              category={"1 v 1 chat"}
            />
            <ChatCategoryCard
              Icon={TiGroupOutline}
              cardSize={"30"}
              comment={"Chat with freind"}
              category={"1 v N chat"}
            />
            <ChatCategoryCard
              Icon={CgScreen}
              cardSize={"30"}
              comment={"Cam Chat with freind"}
              category={"1 v 1 chat"}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

import type { NextPage } from "next";
import Head from "next/head";
import { RefObject, useRef } from "react";
import { BsPeople, TiGroupOutline, CgScreen } from "@components/icon";
import { useRouter } from "next/router";
import ChatCategoryCard from "@components/Card/ChatCategory";
import { loadingPageQuery } from "../type/routingQuery";

const Home: NextPage = () => {
  const videoRef: RefObject<HTMLVideoElement> = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const transferToLoading = async ({ category, type }: loadingPageQuery) => {
    // transfre to loading page what have "type" query
    router.push(
      {
        pathname: "/chat/loading",
        query: {
          category,
          type,
        },
      },
      "/chat/loading"
    );
  };
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
                onClick={() =>
                  transferToLoading({ category: "public", type: "oneonone" })
                }
                className="bg-gradient-to-r  hover:from-green-500 hover:to-green-900 delay-100 mt-4 px-16 py-4 ">
                <span className="text-white font-bold md:text-lg lg:text-2xl">
                  JOIN
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-black text-black dark:text-white py-2">
          <h1 className="text-3xl font-bold text-center py-6">Public</h1>
          <div className="grid grid-cols-2 grid-flow-col px-2 mb-3">
            <ChatCategoryCard
              onClick={() =>
                transferToLoading({ category: "public", type: "oneonone" })
              }
              Icon={BsPeople}
              comment={"Chat with stranger"}
              category={"1 v 1 chat"}
            />
            <ChatCategoryCard
              onClick={() =>
                transferToLoading({ category: "public", type: "group" })
              }
              Icon={TiGroupOutline}
              comment={"Chat with strangers"}
              category={"1 v N chat"}
            />
          </div>
          <h1 className="text-3xl font-bold text-center py-6">Private</h1>
          <div className="grid grid-cols-3 grid-flow-col px-2">
            <ChatCategoryCard
              onClick={() =>
                transferToLoading({ category: "private", type: "oneonone" })
              }
              Icon={BsPeople}
              comment={"Chat with freind"}
              category={"1 v 1 chat"}
            />
            <ChatCategoryCard
              onClick={() =>
                transferToLoading({ category: "private", type: "group" })
              }
              Icon={TiGroupOutline}
              comment={"Chat with freind"}
              category={"1 v N chat"}
            />
            <ChatCategoryCard
              onClick={() =>
                transferToLoading({ category: "private", type: "cam" })
              }
              Icon={CgScreen}
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

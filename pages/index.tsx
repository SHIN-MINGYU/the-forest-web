// 1. hooks or react/next and ...etc built-in function
import type { NextPage } from "next";
import Head from "next/head";
import { RefObject, useRef } from "react";
import { useRouter } from "next/router";

// 2. util or hand-made function

// 3. query for graphql

// 4. associated with component
import { BsPeople, TiGroupOutline, CgScreen } from "../components/icon";
import ChatCategoryCard from "../components/card/ChatCategory";
import { transferToLoading } from "../utils/transferPage";

// 5. types

const Home: NextPage = () => {
  const videoRef: RefObject<HTMLVideoElement> = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const transferToPrivateWindow = async () => {
    router.push("/chat/private/main");
  };

  return (
    <div className="overflow-x-hidden">
      <Head>
        <title>The Forest</title>
        <meta name="description" content="main page" />
        <meta content="text/html; text/javascript"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="relative">
          <video className="min-w-full" ref={videoRef} loop autoPlay muted>
            <source src="videos/mainVideo.mp4" type="video/mp4"></source>
          </video>
          <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
            <div className="text-center">
              <p className="text-white md:text-3xl lg:text-5xl">The Forest</p>
              <p className="text-white md:text-lg lg:text-2xl  mt-1">
                with Stranger
              </p>
              <button
                onClick={() =>
                  transferToLoading({
                    category: "public",
                    type: "oneonone",
                    router,
                  })
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
          <h1 className="text-2xl font-bold text-center py-6">Public</h1>
          <div className="grid md:grid-cols-2 md:grid-flow-col px-2 mb-3 space-y-10 md:space-y-0">
            <ChatCategoryCard
              onClick={() =>
                transferToLoading({
                  category: "public",
                  type: "oneonone",
                  router,
                })
              }
              Icon={BsPeople}
              comment={"Chat with stranger"}
              category={"1 v 1 chat"}
              size={80}
            />
            <ChatCategoryCard
              onClick={() =>
                transferToLoading({ category: "public", type: "group", router })
              }
              Icon={TiGroupOutline}
              comment={"Chat with strangers"}
              category={"1 v N chat"}
              size={80}
            />
          </div>
          <h1 className="text-2xl font-bold text-center py-6">Private</h1>
          <div className="px-2">
            <ChatCategoryCard
              onClick={() => transferToPrivateWindow()}
              Icon={CgScreen}
              comment={"Enter Private Room"}
              category={"chat with friends!"}
              size={"full"}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import ArticleContent from "../components/about/AricleContent";
import Article from "../components/about/Article";
import { transferToLoading } from "../utils/transferPage";

const About: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>The Forest</title>
        <meta name="description" content="about page" />
        <meta content="text/html; text/javascript"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-7xl min-h-screen mx-auto px-8 border drop-shadow-xl">
        <div className="flex-col flex-auto">
          <div className="flex mt-6">
            <p className="text-2xl font-bold">About</p>
          </div>
          <div className="flex my-6">
            <p className="italic">
              What dose{" "}
              <span className="bg-yellow-200 text-lg">The Forest</span> means?
            </p>
          </div>
          <Article title="The Forest" imgSrc={"/images/about_forest1.jpg"}>
            <ArticleContent keyword={"connection"} keywordColor="green">
              In the forest, there are many things we haven't seen in the city.
              Forest It's a place where a lot of animals make a connection with
              each other. Sometimes people also meet new connection in the
              forest.
            </ArticleContent>
          </Article>
          <Article
            title="Connection"
            imgSrc={"/images/about_forest2.jpg"}
            position="end">
            <ArticleContent
              keyword={"connection"}
              position="end"
              keywordColor="green">
              In the cify, we live in threadmill life. Of course, there's
              nothing we can do to make a living. But at least one time, why
              don't you just walk through the woods and find a new connection
            </ArticleContent>
          </Article>
          <Article title="Conversation" imgSrc="/images/about_forest3.jpg">
            <ArticleContent>
              Many people are under a lot of stress due to various factors what
              from trivial to unspeakable concerns. Then, why don't you talk to
              the strangers know and talk about it and make a connection. It
              will work properly to your concerns.
            </ArticleContent>
          </Article>
          <div className="text-center m-16 space-y-6">
            <div>Come on! Let's walk in The Forest together</div>
            <button
              onClick={() =>
                transferToLoading({
                  category: "public",
                  type: "oneonone",
                  router,
                })
              }
              className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
              JOIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;

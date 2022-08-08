import "../styles/globals.css";
import type { AppProps } from "next/app";

import { useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { useRouter } from "next/router";

import { ObjectId } from "bson";
import { getSessionStorage, setSessionStorage } from "../utils/sessionStorage";
import GNB from "@components/GNB";
import Footer from "@components/Footer";
import UserLoginout from "../components/UserLoginout";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    userCheck();
  }, []);
  const router = useRouter();

  return (
    <div className="flex flex-col overflow-x-auto">
      <ApolloProvider client={client}>
        {router.pathname != "/chat/private/video/[uid]" && (
          <>
            <UserLoginout />
            <GNB></GNB>
            <Component {...pageProps} />
            <Footer></Footer>
          </>
        )}
        {router.pathname === "/chat/private/video/[uid]" && (
          <Component {...pageProps} />
        )}
      </ApolloProvider>
    </div>
  );
}

const userCheck = () => {
  if (!getSessionStorage("user")) {
    setSessionStorage("user", new ObjectId().toString());
  }
};

export default MyApp;

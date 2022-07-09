import "../styles/globals.css";
import type { AppProps } from "next/app";
import GNB from "@components/GNB";
import Footer from "@components/Footer";
import { useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { ObjectId } from "bson";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      userCheck();
    }
  }, []);

  return (
    <div className="flex flex-col overflow-x-auto">
      <ApolloProvider client={client}>
        <GNB></GNB>
        <Component {...pageProps} />
        <Footer></Footer>
      </ApolloProvider>
    </div>
  );
}

const userCheck = () => {
  if (!localStorage.getItem("accessToken")) {
    if (!sessionStorage.getItem("user")) {
      sessionStorage.setItem("user", new ObjectId().toString());
    } else {
      console.log("aleady exist");
    }
  }
};

export default MyApp;

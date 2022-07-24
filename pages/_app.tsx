import "../styles/globals.css";
import type { AppProps } from "next/app";
import GNB from "@components/GNB";
import Footer from "@components/Footer";
import { useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { ObjectId } from "bson";
import { getSessionStorage, setSessionStorage } from "../utils/sessionStorage";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    userCheck();
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
  if (!getSessionStorage("user")) {
    setSessionStorage("user", new ObjectId().toString());
  }
};

export default MyApp;

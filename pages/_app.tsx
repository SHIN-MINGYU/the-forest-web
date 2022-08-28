// 1. hooks or react/next and ...etc built-in function
import { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { useRouter } from "next/router";
import { ObjectId } from "bson";

// 2. util or hand-made function
import { getSessionStorage, setSessionStorage } from "../utils/sessionStorage";

// 3. query for graphql

// 4. associated with component
import GNB from "@components/GNB";
import Footer from "@components/Footer";
import UserLoginout from "../components/util/UserLoginout";
import SubscribeCall from "../components/util/SubscribeCall";

// 5. types
import type { AppProps } from "next/app";

// 6. style
import "../styles/globals.css";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userCheck();
    if (typeof window != "undefined") {
      setLoading(false);
    }
  }, []);
  const router = useRouter();

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <div className="flex justify-center items-center">
          <p>please wating for connect with window</p>
        </div>
      </div>
    );
  }

  return (
    <div className="root flex flex-col overflow-x-auto">
      <ApolloProvider client={client}>
        {!loading && router.pathname != "/chat/private/video/[room]" && (
          <>
            <UserLoginout />
            <SubscribeCall />
            <GNB></GNB>
            <Component {...pageProps} />
            <Footer></Footer>
          </>
        )}
        {router.pathname === "/chat/private/video/[room]" && (
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
  if (!getLocalStorage("myColor")) {
    setLocalStorage("myColor", "red-200");
  }
  if (!getLocalStorage("opponentColor")) {
    setLocalStorage("opponentColor", "red-400");
  }
};

export default MyApp;

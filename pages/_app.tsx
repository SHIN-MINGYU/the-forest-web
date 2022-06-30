import "../styles/globals.css";
import type { AppProps } from "next/app";
import GNB from "../components/GNB";
import Footer from "../components/Footer";
import wrapper from "../redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { pageType } from "../type/reduxType";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { ObjectId } from "bson";

function MyApp({ Component, pageProps }: AppProps) {
  const theme = useSelector(({ page }: pageType) => page.theme);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      userCheck();
    }
  }, [theme]);

  return (
    <div className="flex flex-col">
      <GNB></GNB>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
      <Footer></Footer>
    </div>
  );
}

const userCheck = () => {
  if (!sessionStorage.getItem("user")) {
    sessionStorage.setItem("user", new ObjectId().toString());
  } else {
    console.log("aleady exist");
  }
};

export default wrapper.withRedux(MyApp);

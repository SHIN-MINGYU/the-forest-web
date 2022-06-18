import "../styles/globals.css";
import type { AppProps } from "next/app";
import GNB from "../components/GNB";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col">
      <GNB></GNB>
      <Component {...pageProps} />
      <Footer></Footer>
    </div>
  );
}

export default MyApp;

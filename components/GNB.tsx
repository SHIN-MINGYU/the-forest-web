import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getLocalStorage } from "@hooks/LocalStorage";
import { useRouter } from "next/router";
import DarkModeIcon from "./icon/DarkModeIcon";
import LightModeIcon from "./icon/LightModeIcon";
import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import { GET_USER_NAME, LOG_OUT } from "../query/userQuery";

const ThemeIcon = () => {
  const [theme, setTheme] = useState(getLocalStorage("theme"));
  const [icon, setIcon] = useState<JSX.Element>(<></>);
  useEffect(() => {
    if (theme === "dark") {
      setIcon(<DarkModeIcon setTheme={setTheme}></DarkModeIcon>);
      document.documentElement.classList.toggle("dark");
      //if our website's body tag has dark class, this do delete that
      //if it is not exist, add class what is dark
    } else if (theme === "light") {
      setIcon(<LightModeIcon setTheme={setTheme}></LightModeIcon>);
      document.documentElement.classList.toggle("dark");
    }
  }, [theme]);

  return icon;
};

function GNB() {
  const router = useRouter();
  const [LogOut] = useMutation(LOG_OUT);
  const { data } = useQuery(GET_USER_NAME);

  const buttonHandler = () => {
    return data ? (
      <button
        onClick={() => {
          LogOut();
          localStorage.removeItem("accessToken");
        }}>
        Welcome {data.UserInfo.username} !
      </button>
    ) : (
      <button onClick={() => router.push("/login")}>Hello Stranger!</button>
    );
  };

  return (
    <div className="flex shadow-lg shadow-white dark:shadow-black justify-around top-0 z-50 bg-white min-w-full p-3 dark:bg-black ">
      <Link href="/">
        <div className="flex items-center" style={{ cursor: "pointer" }}>
          <Image
            src="/favicon.ico"
            width={50}
            height={50}
            alt="favicon"></Image>
          <span className="ml-2 text-2xl text-green-700 font-bold">
            The Forest
          </span>
          <span className="mt-3 ml-2 text-xs text-green-700 font-bold">
            with a stranger
          </span>
        </div>
      </Link>
      <div className="flex items-center">
        <ul className="text-black dark:text-white">
          <li className="float-left mr-4">
            <Link href="/about"> About</Link>
          </li>
          <li className="float-left mr-4">Policy</li>
          <li className="float-left mr-20 ">Contact</li>
          <li className="float-left mr-4 mt-1">
            <p>
              <ThemeIcon></ThemeIcon>
            </p>
          </li>
          <li className="float-left mr-4">{buttonHandler()}</li>
        </ul>
      </div>
    </div>
  );
}

export default GNB;

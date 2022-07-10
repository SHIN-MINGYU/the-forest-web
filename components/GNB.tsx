import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_NAME } from "@query/userQuery";

import ThemeIcon from "./GNBComponent/icon/ThemeIcon";
import GuestsButton from "./GNBComponent/button/GuestsButton";
import UsersButton from "./GNBComponent/button/UsersButton";

function GNB() {
  const { data, error } = useQuery(GET_USER_NAME);
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
          <li className="float-left mr-4">
            {data ? <UsersButton data={data} /> : <GuestsButton />}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default GNB;

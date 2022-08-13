// 1. hooks or react/next and ...etc built-in function
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useMyInfo } from "../hooks/useGetMyInfo";
import dynamic from "next/dynamic";

// 2. util or hand-made function

// 3. query for graphql

// 4. associated with component
import ThemeIcon from "./GNBComponent/icon/ThemeIcon";
import GuestsButton from "./GNBComponent/button/GuestsButton";
import UsersButton from "./GNBComponent/button/UsersButton";
import { AiOutlineMenu } from "react-icons/ai";

// 5. types

const GNB = () => {
  const getInfo = useMyInfo();
  const { ...myInfo } = getInfo();
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const SideBar = dynamic(import("./GNBComponent/SideBar"));
  return (
    <div className="flex shadow-md justify-around top-0 z-50 bg-white min-w-full p-3 dark:bg-black ">
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
      <div className="items-center hidden md:flex">
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
            {myInfo.userType === "GUEST" && <GuestsButton {...myInfo} />}
            {myInfo.userType === "USER" && <UsersButton {...myInfo} />}
          </li>
        </ul>
      </div>
      <div className="items-center flex md:hidden  cursor-pointer">
        <AiOutlineMenu
          onClick={() => setSideBarVisible(true)}
          size={30}></AiOutlineMenu>
      </div>
      {sideBarVisible && (
        <>
          <div
            onClick={() => setSideBarVisible(false)}
            className="fixed top-0 bottom-0 right-0 left-0 backdrop-blur-md"></div>
          <SideBar {...myInfo} />
        </>
      )}
    </div>
  );
};

export default GNB;

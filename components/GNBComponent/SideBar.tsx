import { useMutation } from "@apollo/client";
import { useMyInfo } from "@hooks/useGetMyInfo";
import { LOG_OUT } from "@query/userQuery";
import Image from "next/image";
import { useEffect, useState } from "react";

import {
  AiOutlineContacts,
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { MdOutlineLocalPolice } from "react-icons/md";

const SideBar = () => {
  const [visible, setVisible] = useState(false);
  const {
    userInfo: { imgPath, nickname },
    userType,
  } = useMyInfo()();

  useEffect(() => {
    setVisible(true);
  }, []);

  const [LogOut] = useMutation(LOG_OUT);

  const transferToPage = (page: string) => {
    if (page === "Home") {
      location.href = "/";
      return;
    }
    location.href = "/" + page.toLowerCase();
  };

  const userLogout = () => {
    // send Logout mutaition
    LogOut();
    //clean accessToken
    localStorage.removeItem("accessToken");
    //reloading page
    location.href = "/";
  };

  return (
    <div
      className={`fixed ease-in duration-300 top-0 right-0 h-full delay-100 rounded-md w-64 space-y-4 bg-white ${
        visible ? "translate-x-0 " : "translate-x-full"
      }`}
    >
      <div className="h-20 flex justify-center items-center space-x-4">
        <Image
          src={"/favicon.ico"}
          width={30}
          height={30}
          alt="favicon"
        ></Image>
        <span className="text-xl text-green-800">The Forest</span>
      </div>
      <div className="h-20 border flex items-center justify-around">
        <span>welcome! </span>
        <span className="flex items-center font-bold text-green-600 text-md space-x-3">
          <Image src={imgPath} width={30} height={30} alt="profile"></Image>
          <span>{nickname}</span>
        </span>
      </div>
      <div className="flex flex-col px-10 space-y-3">
        <span className="text-gray-400">menu</span>
        <div className="flex flex-col px-10 space-y-5">
          <div
            onClick={() => transferToPage("Home")}
            className="flex space-x-3"
          >
            <AiOutlineHome className="basis-1/4" size={20}></AiOutlineHome>
            <span className="basis-3/4">Home</span>
          </div>
          <div
            onClick={() => transferToPage("About")}
            className="flex space-x-3"
          >
            <AiOutlineQuestionCircle
              className="basis-1/4"
              size={20}
            ></AiOutlineQuestionCircle>
            <span className="basis-3/4">About</span>
          </div>
          <div className="flex space-x-3">
            <MdOutlineLocalPolice
              className="basis-1/4"
              size={20}
            ></MdOutlineLocalPolice>
            <span className="basis-3/4">Policy</span>
          </div>
          <div className="flex space-x-3">
            <AiOutlineContacts
              className="basis-1/4"
              size={20}
            ></AiOutlineContacts>
            <span className="basis-3/4">Contact</span>
          </div>
        </div>
      </div>
      <div className="flex">
        <label
          htmlFor="default-toggle-size"
          className="inline-flex mx-auto relative items-center cursor-pointer"
        >
          <input
            type="checkbox"
            id="default-toggle-size"
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            White Mode
          </span>
        </label>
      </div>
      {userType === "GUEST" && (
        <div
          onClick={() => transferToPage("Login")}
          className="absolute border flex bottom-0 w-full space-x-3 items-center justify-center"
        >
          <AiOutlineLogin size={20}></AiOutlineLogin>
          <span>Login</span>
        </div>
      )}
      {userType === "USER" && (
        <div
          onClick={() => userLogout()}
          className="absolute border flex bottom-0 w-full space-x-3 items-center justify-center"
        >
          <AiOutlineLogout size={20}></AiOutlineLogout>
          <span>Logout</span>
        </div>
      )}
    </div>
  );
};

export default SideBar;

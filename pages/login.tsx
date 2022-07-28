import { useLazyQuery } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { KeyboardEvent } from "react";
import { setLocalStorage } from "utils/localStorage";
import useInput from "@hooks/useInput";

import { FaRegUserCircle, RiLockPasswordLine } from "@components/icon";
import InfoInput from "@components/signUp/InfoInput";

import { LOGIN_QUE } from "@query/publicChatQuery";

const Login: NextPage = () => {
  const router = useRouter();
  const username = useInput("");
  const password = useInput("");
  const [autificate] = useLazyQuery(LOGIN_QUE);
  const sendLoginReq = async () => {
    try {
      const res = await autificate({
        variables: { username: username.value, password: password.value },
      });
      setLocalStorage("accessToken", res.data.Login);
      location.href = "/";
    } catch (err) {
      alert("user info is not incurrent");
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendLoginReq();
    }
  };

  return (
    <div className="w-screen h-screen bg-white bg-[url('/images/chat_background.jpg')] flex flex-col justify-center items-center">
      <div
        className="
        bg-white p-10 w-screen md:w-1/2 
        rounded-xl text-center space-y-8 shadow-lg">
        <div className="mb-8 text-center">
          <p className="tracking-widest md:text-3xl sm:text-xl font-bold font-sans">
            Login
          </p>
        </div>
        <InfoInput
          Icon={FaRegUserCircle}
          label="id"
          stateHandler={username}></InfoInput>
        <InfoInput
          Icon={RiLockPasswordLine}
          type="password"
          label="password"
          stateHandler={password}
          onKeyDown={(e) => onKeyDown(e)}></InfoInput>
        <button
          onClick={() => {
            sendLoginReq();
          }}
          className="
            bg-emerald-500 w-1/3 shadow-md shadow-emerald-500
              font-bold rounded-2xl hover:bg-emerald-700
              p-4 text-white">
          Submit
        </button>
        <p className="text-blue-600">forgot your password?</p>
        <p className="cursor-pointer" onClick={() => router.push("/signup")}>
          create an account
        </p>
      </div>
    </div>
  );
};

export default Login;

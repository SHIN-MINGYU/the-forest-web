import { FaRegUserCircle } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import InfoInput from "@components/signUp/InfoInput";
import useInput from "@hooks/useInput";
import { gql, useMutation } from "@apollo/client";
import Head from "next/head";
import { NextPage } from "next";

const SIGN_UP = gql`
  mutation ($username: String!, $nickname: String!, $password: String!) {
    SignUp(username: $username, nickname: $nickname, password: $password)
  }
`;

const SignUp: NextPage = () => {
  const username = useInput("");
  const nickname = useInput("");
  const password = useInput("");
  const checkPassword = useInput("");
  const verificationCode = useInput("");
  const [signUp] = useMutation(SIGN_UP);
  return (
    <div className="h-screen min-w-screen bg-[url('/images/chat_background.jpg')]  flex flex-col justify-center items-center">
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="main page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="
        bg-white p-10 w-screen md:w-1/2 
        rounded-xl text-center space-y-6 shadow-lg">
        <div className="mb-8 text-center">
          <p className="tracking-widest md:text-3xl sm:text-xl font-bold font-sans">
            Create Account
          </p>
          <p className="text-red-600">* are essential options</p>
        </div>
        <div
          className="
        grid md:grid-cols-2 sm:grid-cols-1 gap-4 grid-flow-row">
          <InfoInput
            Icon={FaRegUserCircle}
            stateHandler={username}
            label="id"
            required
            waringMassage="this will be required for login"></InfoInput>
          <InfoInput
            Icon={FaRegUserCircle}
            stateHandler={nickname}
            label="nickname"
            required></InfoInput>
          <InfoInput
            Icon={RiLockPasswordLine}
            stateHandler={password}
            label="password"
            required></InfoInput>
          <InfoInput
            Icon={RiLockPasswordLine}
            stateHandler={checkPassword}
            label="check vaild password"
            required></InfoInput>
          <div className="relative">
            <div className="flex justify-center items-center">
              <AiOutlineMail size={20}></AiOutlineMail>
              <input
                type={"text"}
                className="peer h-10
                pl-2
            w-full bg-transparent border-b-2 border-black
            placeholder-transparent
            text-sm
            focus:ring-0
            focus:outline-none focus:border-green-400"
                placeholder="password"></input>
              <label
                className="absolute
              left-8 top-3 transition-all
             text-gray-600 text-sm
             transform -translate-y-4
             scale-75 z-10 origin-[0]
             peer-focus:text-green-400
             peer-placeholder-shown:scale-100
             peer-placeholder-shown:translate-y-0
             peer-focus:scale-75
             peer-focus:-translate-y-4
             ">
                email
              </label>
              <button
                className="absolute
              right-0 text-white bg-gradient-to-r from-blue-500 
              via-blue-600 to-blue-700 hover:bg-gradient-to-br 
              focus:outline-none focus:ring-blue-300 font-medium 
              rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                send
              </button>
            </div>
            <p className="text-xs tracking-wider text-cyan-600">
              verification code successfully send
            </p>
          </div>
          <InfoInput
            Icon={RiLockPasswordLine}
            stateHandler={verificationCode}
            label="vertification code"
            required={false}></InfoInput>
        </div>
        <button
          onClick={() => {
            signUp({
              variables: {
                username: username.value,
                nickname: nickname.value,
                password: password.value,
              },
            });
          }}
          className="
            bg-cyan-500 w-1/3 shadow-md shadow-cyan-500
              font-bold rounded-2xl hover:bg-cyan-700
              p-4">
          Sign Up For Free!
        </button>
      </div>
    </div>
  );
};
export default SignUp;

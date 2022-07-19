import { useLazyQuery, useMutation } from "@apollo/client";
import Head from "next/head";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import useInput from "@hooks/useInput";

import {
  FaRegUserCircle,
  RiLockPasswordLine,
  AiOutlineMail,
} from "@components/icon";
import { SendButton, InfoInput } from "@components/signUp";

import { REQUEST_SEND_MAIL, SEARCH_USER, SIGN_UP } from "@query/userQuery";

const SignUp: NextPage = () => {
  const router = useRouter();
  const username = useInput("");
  const nickname = useInput("");
  const password = useInput("");
  const confirmPassword = useInput("");
  const email = useInput("");
  const verificationCode = useInput("");
  // input state handler
  const accessCode = useRef<string>("");
  //value get email accessCode
  const [userNameFound, setUserNameFound] = useState<boolean>(true);
  const [emailVerifySuccess, setEmailVerifySuccess] = useState<boolean>();
  // validator
  const [currentEmail, setCurrentEmail] = useState<string>("");
  const [emailButtonMsg, setEmailButtonMsg] = useState<string>("");
  const [usernameMsg, setUserNameMsg] = useState<string>("");
  // msg for infoInput
  const [searchUser] = useLazyQuery(SEARCH_USER, {
    variables: {
      username: username.value,
    },
  });
  const [signUp] = useMutation(SIGN_UP);
  const [sendMail] = useMutation(REQUEST_SEND_MAIL);
  const usernameCheck = async () => {
    // check username is existed in DB
    if (username.value) {
      const res = await searchUser();
      if (res.data.SearchUser) {
        setUserNameFound(true);
        setUserNameMsg("id aleady exists");
      } else {
        setUserNameFound(false);
        setUserNameMsg("available id");
      }
    } else {
      alert("input id values");
    }
  };
  const emailCodeValidator = (setState: Dispatch<SetStateAction<boolean>>) => {
    //check value sent to email and value get to server
    if (accessCode.current === verificationCode.value) {
      setEmailVerifySuccess(true);
      setState(true);
    } else {
      setState(false);
    }
  };
  const submitInfo = () => {
    // submit's error handlings
    if (
      username.value &&
      nickname.value &&
      password.value &&
      confirmPassword.value &&
      !userNameFound
    ) {
      if (password.value !== confirmPassword.value) {
        alert("password and conrifm password is not same");
        return;
      }
      if (/[0-9]/g.test(password.value) && /[a-z]/g.test(password.value)) {
        signUp({
          variables: {
            username: username.value,
            nickname: nickname.value,
            password: password.value,
            email: emailVerifySuccess ? currentEmail : "",
          },
        });
        router.replace("/");
      } else {
        alert("check your password");
      }
    } else {
      alert("input value");
    }
  };

  const sendVerificationCode = async () => {
    //send email to server and get the verifyCode
    try {
      setCurrentEmail(email.value);
      const res = await sendMail({
        variables: {
          email: email.value,
        },
      });
      setEmailButtonMsg("successfully sed");
      accessCode.current = String(res.data.SendMail);
    } catch (err) {
      setEmailButtonMsg("bad request");
      alert(err);
    }
  };

  const passwordValidator = (setState: Dispatch<SetStateAction<boolean>>) => {
    // password validator
    if (password.value.trim() !== confirmPassword.value.trim()) {
      setState(false);
    } else {
      setState(true);
    }
  };

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
            button={<SendButton title="check" onClick={usernameCheck} />}
            buttonMsg={usernameMsg}
            required
            waringMassage="this will be required for login"
          />
          <InfoInput
            Icon={FaRegUserCircle}
            stateHandler={nickname}
            label="nickname"
            required
          />
          <InfoInput
            Icon={RiLockPasswordLine}
            stateHandler={password}
            type="password"
            label="password"
            waringMassage="create at least 1 number and 1 alphabet"
            required
          />
          <InfoInput
            Icon={RiLockPasswordLine}
            stateHandler={confirmPassword}
            type="password"
            label="confirm password"
            validator={passwordValidator}
            validatorMsg="confirm password is not vaild"
            required
          />
          <InfoInput
            Icon={AiOutlineMail}
            stateHandler={email}
            label="email"
            button={<SendButton title="send" onClick={sendVerificationCode} />}
            buttonMsg={emailButtonMsg}
          />
          <InfoInput
            Icon={RiLockPasswordLine}
            stateHandler={verificationCode}
            validator={emailCodeValidator}
            label="vertification code"
            validatorMsg="vertification code is not current"
            required={false}
          />
        </div>
        <button
          onClick={submitInfo}
          className="
            bg-green-500 w-1/3 shadow-md shadow-green-500
              font-bold rounded-2xl hover:bg-green-700 
              hover:shadow-green-700 p-4">
          Sign Up For Free!
        </button>
      </div>
    </div>
  );
};
export default SignUp;

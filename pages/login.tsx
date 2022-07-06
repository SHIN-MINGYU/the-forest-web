import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { FaRegUserCircle } from "react-icons/fa";
import InfoInput from "../components/signUp/InfoInput";
import { setLocalStorage } from "../hooks/LocalStorage";
import useInput from "../hooks/useInput";

const LOGIN = gql`
  query ($username: String!, $password: String!) {
    Login(username: $username, password: $password)
  }
`;

const Login: NextPage = () => {
  const router = useRouter();
  const username = useInput("");
  const password = useInput("");
  const [autificate] = useLazyQuery(LOGIN);
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
          label={"id"}
          stateHandler={username}></InfoInput>
        <InfoInput
          Icon={FaRegUserCircle}
          label={"password"}
          stateHandler={password}></InfoInput>
        <button
          onClick={() => {
            autificate({
              variables: { username: username.value, password: password.value },
            })
              .then((res) => {
                setLocalStorage("accessToken", res.data.Login);
                router.push("/");
              })
              .catch((err) => console.log(err));
          }}
          className="
            bg-emerald-500 w-1/3 shadow-md shadow-emerald-500
              font-bold rounded-2xl hover:bg-emerald-700
              p-4 text-white">
          Submit
        </button>
        <p className="text-blue-600">forgot your password?</p>
      </div>
    </div>
  );
};

export default Login;

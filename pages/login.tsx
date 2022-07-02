import { FaRegUserCircle } from "react-icons/fa";
import InfoInput from "../components/signUp/InfoInput";
import useInput from "../hooks/useInput";

function Login() {
  const id = useInput("");
  const password = useInput("");
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
          stateHandler={id}></InfoInput>
        <InfoInput
          Icon={FaRegUserCircle}
          label={"password"}
          stateHandler={password}></InfoInput>
        <button
          onClick={() => {}}
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
}

export default Login;

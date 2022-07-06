import { AiFillProfile, AiOutlineLogin } from "react-icons/ai";
import { useRouter } from "next/router";
import { useState } from "react";

const GuestsButton = () => {
  const [clicked, setClicked] = useState<boolean>(false);
  const router = useRouter();
  return (
    <div>
      <button
        onClick={
          () => {
            console.log(clicked);
            setClicked(!clicked);
          } /*  router.push("/login") */
        }>
        Hello Stranger!
      </button>
      <div
        className={`absolute w-32 space-y-3 mt-3 text-black transition-all bg-white opacity-${
          clicked ? 100 : 0
        }`}>
        <div className="flex text-center p-2">
          <div className="w-1/5">
            <AiFillProfile className="m-auto" size={20}></AiFillProfile>
          </div>
          <span className="m-auto">my profile</span>
        </div>
        <div
          className="flex text-center p-2 cursor-pointer"
          onClick={() => {
            router.push("/login");
            setClicked(false);
          }}>
          <div className="w-1/5">
            <AiOutlineLogin className="m-auto" size={20} />
          </div>
          <span className="m-auto">Login</span>
        </div>
      </div>
    </div>
  );
};

export default GuestsButton;

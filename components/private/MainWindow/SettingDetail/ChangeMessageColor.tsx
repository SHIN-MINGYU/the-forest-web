// 1. hooks or react/next and ...etc built-in function
import { useState } from "react";

// 2. util or hand-made function

// 3. query for graphql

// 4. associated with component
import ChatBubble from "../../../publicChat/MainScreen/ChatBubble";

// 5. types
import { UserInfo } from "types/user.type";
import { API_ENDPOINT } from "utils/loadEnv";
import Pallete from "./Pallete";

type Props = {
  userInfo: Omit<UserInfo, "status">;
};

const ChangeMessageColor = ({ userInfo }: Props) => {
  const chatLog = {
    __typename: "",
    uid: userInfo._id,
    log: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio voluptatem tempore enim nihil et?",
    createAt: new Date(),
    imgPath: API_ENDPOINT + "img/profile.png",
    nickname: "ME",
  };

  const [opponentColor, setOpponentColor] = useState("");
  const [myColor, setMyColor] = useState("");
  return (
    <div className="w-full h-full p-6 flex">
      <div className="w-1/2">
        <div className="w-full p-2 flex justify-center itmes-center">
          <span className="m-auto">My Color</span>
        </div>
        <div className="w-full p-2 border rounded-lg border-red-200 drop-shadow-md">
          <div className="text-sm">
            <span>preview</span>
          </div>
          <ChatBubble chatLog={chatLog} uid={""}></ChatBubble>
        </div>

        <Pallete />
      </div>
      <div className="w-1/2"></div>
    </div>
  );
};

export default ChangeMessageColor;

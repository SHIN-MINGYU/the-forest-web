import { Dispatch, SetStateAction } from "react";
import { UserInfo } from "../../../../../types/user.type";
import { API_ENDPOINT } from "../../../../../utils/loadEnv";
import ChatBubble from "../../../../publicChat/MainScreen/ChatBubble";
import Pallete from "../Pallete";

type Props = {
  myChat?: boolean;
  userInfo: Omit<UserInfo, "status">;
  setColor: Dispatch<SetStateAction<string>>;
};

const PalleteCard = ({ myChat, userInfo, setColor }: Props) => {
  const chatLog = (myChat?: boolean) => ({
    __typename: "",
    uid: myChat ? userInfo._id : "",
    log: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio voluptatem tempore enim nihil et?",
    createAt: new Date(),
    imgPath: API_ENDPOINT + "img/profile.png",
    nickname: "ME",
  });

  return (
    <div className={`w-1/2 p-4 ${myChat ? "border-r" : "border-l"}`}>
      <div className="bg-gray-900  border-l-gray-900  border-r-gray-900"></div>
      <div className="w-full p-2 flex justify-center itmes-center">
        <span className="m-auto">{myChat ? "My Color" : "Opponent Color"}</span>
      </div>
      <div className="w-full p-2 border rounded-lg border-red-200 drop-shadow-md">
        <div className="text-sm">
          <span>preview</span>
        </div>
        <ChatBubble chatLog={chatLog(myChat)} uid={userInfo._id}></ChatBubble>
      </div>
      <Pallete who={myChat ? "myColor" : "opponentColor"} setState={setColor} />
    </div>
  );
};

export default PalleteCard;

import { chatList } from "@type/privateRoom";
import Image from "next/image";
import CardContainer from "./Container/CardContainer";

type props = {
  height: number;
  onClick: () => void;
  chatList: chatList;
};

const ChatListCard = ({ height, chatList, onClick }: props) => {
  return (
    <CardContainer height={height} onClick={onClick}>
      <div className="basis-1/4 flex justify-center items-center">
        <Image
          src={chatList.imgPath}
          width={40}
          height={40}
          alt="profile"
        ></Image>
      </div>
      <div className="basis-2/3 w-72 my-auto space-y-3 overflow-hidden">
        <div className="flex justify-between">
          <p>{chatList.nickname}</p>
          <p>{chatList.afterNow}</p>
        </div>
        <p className="text-sm text-gray-500 truncate">{chatList.chatLog}</p>
      </div>
    </CardContainer>
  );
};

export default ChatListCard;

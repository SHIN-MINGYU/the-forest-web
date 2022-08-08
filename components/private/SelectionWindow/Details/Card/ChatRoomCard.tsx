import { useSubscription } from "@apollo/client";
import { chatList } from "@type/privateRoom";
import moment from "moment";
import Image from "next/image";
import { CHECK_CHAT_ACTION_SUB } from "@query/publicChatQuery";
import CardContainer from "./Container/CardContainer";

type props = {
  height: number;
  onClick: () => void;
  chatList: chatList;
};

const ChatListCard = ({ height, chatList, onClick }: props) => {
  const { data } = useSubscription(CHECK_CHAT_ACTION_SUB, {
    variables: {
      chatRoom: chatList.chatRoom,
    },
  });
  return (
    <CardContainer height={height} onClick={onClick}>
      <div className="basis-1/4 grid grid-flow-col grid-cols-2 grid-rows-2 p-2">
        {chatList.user.map((user, index) => {
          if (index > 3) return; // private rooms profile image's index limit 4
          return (
            <Image
              key={index}
              src={user.imgPath}
              width={40}
              height={40}
              layout="responsive"
              alt="profile"></Image>
          );
        })}
      </div>
      <div className="basis-2/3 w-72 my-auto space-y-2 overflow-hidden">
        <div className="flex justify-between">
          <p>{chatList.user[0].nickname}</p>
          <p className="text-sm text-gray-500 truncate">
            {data
              ? moment(data?.CheckChat.createAt).fromNow()
              : moment(chatList.createAt).fromNow()}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-gray-500 truncate">
            {data ? data?.CheckChat.log : chatList.lastChat}
          </p>
          {/*        <div className="w-2 h-2 bg-red-500 rounded-full"></div> */}
        </div>
      </div>
    </CardContainer>
  );
};

export default ChatListCard;

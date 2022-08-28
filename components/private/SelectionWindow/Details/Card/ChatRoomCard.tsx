// 1. hooks or react/next and ...etc built-in function
import { useSubscription } from "@apollo/client";
import Image from "next/image";
import moment from "moment";

// 2. util or hand-made function

// 3. query for graphql
import { CHECK_CHAT_ACTION_SUB } from "@query/publicChatQuery";

// 4. associated with component
import CardContainer from "./Container/CardContainer";

// 5. types
import { ChatList } from "@type/privateRoom.type";
type Props = {
  height: number;
  chatList: ChatList;
  onClick: () => void;
};

const ChatListCard = ({ height, chatList, onClick }: Props) => {
  const { data } = useSubscription(CHECK_CHAT_ACTION_SUB, {
    variables: {
      chatRoom: chatList.chatRoom,
    },
  });

  return (
    <CardContainer height={height} onClick={onClick}>
      <div className="basis-1/4 grid grid-flow-col grid-cols-2 grid-rows-2 p-2">
        {/* section of profile img */}
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
        {/* section of details on chatRoom */}
        <div className="flex justify-between">
          <p>{chatList.user[0].nickname}</p>
          <p className="text-sm text-gray-500 truncate">
            {data
              ? moment(data?.CheckChat.createAt).fromNow()
              : moment(chatList.createAt).fromNow()}
          </p>
        </div>
        <div className="flex justify-between">
          {/* session of status on chatRoom */}
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

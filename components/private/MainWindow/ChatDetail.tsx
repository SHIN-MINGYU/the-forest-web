// 1. hooks or react/next and ...etc built-in function
import { useQuery } from "@apollo/client";

// 2. util or hand-made function

// 3. query for graphql
import { SEARCH_CHAT_LOG_QUE } from "@query/publicChatQuery";

// 4. associated with component
import ChatBubble from "../../publicChat/MainScreen/ChatBubble";
import { ChatInput } from "@components/publicChat/MainScreen";
import BubbleCreator from "../../publicChat/MainScreen/BubbleCreator";

// 5. types
import { ChatDetail } from "@type/privateRoom.type";
import { UserInfo } from "types/user.type";
type Props = {
  data: ChatDetail;
  userInfo: Omit<UserInfo, "status">;
};

const ChatDetail = ({ data, userInfo }: Props) => {
  const { chatRoom, opponentNickname } = data;
  const { data: chatQuery } = useQuery(SEARCH_CHAT_LOG_QUE, {
    variables: {
      chatRoom,
    },
    fetchPolicy: "no-cache",
  });

  const coldChat = chatQuery?.ChatLog;

  return (
    coldChat && (
      <div className="w-full h-full flex flex-col">
        <div className="h-16 flex justify-center items-center border-b-2">
          <p className="">{opponentNickname}</p>
        </div>
        {/* header */}
        <div className="flex-1 border-b-2 px-2 flex flex-col-reverse overflow-auto">
          {/* myBubble */}
          <BubbleCreator chatRoom={chatRoom} uid={userInfo._id}></BubbleCreator>
          {coldChat!.map((el: any, index: number) => (
            <ChatBubble chatLog={el} key={index} uid={userInfo._id} />
          ))}
        </div>
        {/* main */}
        <ChatInput chatRoom={chatRoom} userInfo={userInfo} />
        {/* input */}
      </div>
    )
  );
};

export default ChatDetail;

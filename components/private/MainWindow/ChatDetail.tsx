import { useQuery } from "@apollo/client";
import { useMyInfo } from "@hooks/useGetMyInfo";

import ChatBubble from "../../publicChat/MainScreen/ChatBubble";
import { ChatInput } from "@components/publicChat/MainScreen";
import BubbleCreator from "../../publicChat/MainScreen/BubbleCreator";
import { SEARCH_CHAT_LOG_QUE } from "@query/publicChatQuery";

import { ChatDetail } from "@type/privateRoom";
type props = {
  data: ChatDetail;
};

const ChatDetail = ({ data: { chatRoom, opponentNickname } }: props) => {
  const { data } = useQuery(SEARCH_CHAT_LOG_QUE, {
    variables: {
      chatRoom,
    },
  });
  const coldChat = data?.ChatLog;
  const { uid } = useMyInfo()();
  return (
    uid &&
    coldChat && (
      <div className="w-full h-full flex flex-col">
        <div className="h-16 flex justify-center items-center border-b-2">
          <p className="">{opponentNickname}</p>
        </div>
        {/* header */}
        <div className="flex-1 border-b-2 px-2 flex flex-col-reverse overflow-auto">
          {/* myBubble */}
          <BubbleCreator chatRoom={chatRoom} uid={uid}></BubbleCreator>
          {coldChat!.map((el: any, index: number) => (
            <ChatBubble chatLog={el} key={index} uid={uid} />
          ))}
        </div>
        {/* main */}
        <ChatInput chatRoom={chatRoom} />
        {/* input */}
      </div>
    )
  );
};

export default ChatDetail;

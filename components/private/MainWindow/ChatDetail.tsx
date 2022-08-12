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
import { ChatDetail } from "types/privateRoom";
type Props = {
  data: ChatDetail;
  _id: string;
};

const ChatDetail = ({ data, _id }: Props) => {
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
          <BubbleCreator chatRoom={chatRoom} uid={_id}></BubbleCreator>
          {coldChat!.map((el: any, index: number) => (
            <ChatBubble chatLog={el} key={index} uid={_id} />
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

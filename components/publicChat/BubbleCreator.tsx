import ChatBubble from "./ChatBubble";
import { useEffect } from "react";
import { ChatLog } from "@type/chatType";

function BubbleCreator({
  subscribeToNewChat,
  data,
}: {
  subscribeToNewChat: any;
  data: { ChatLog: [ChatLog] };
}) {
  useEffect(() => {
    subscribeToNewChat();
    // it is work for connect mutationn and query at subscription
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {data &&
        data!.ChatLog.map((el: ChatLog, index: number) => (
          <ChatBubble key={index} chatLog={el}></ChatBubble>
        ))}
    </>
  );
}
export default BubbleCreator;

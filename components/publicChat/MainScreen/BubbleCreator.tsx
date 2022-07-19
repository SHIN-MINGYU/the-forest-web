import ChatBubble from "./ChatBubble";
import React, { useEffect } from "react";
import { ChatLog } from "@type/chatType";
import { imgPath } from "@type/userInfo";

type props = {
  /* subscribeToNewChat: any; */
  data: ChatLog[];
  imgPath: imgPath;
  uid: string;
};

function BubbleCreator({
  /* subscribeToNewChat, */
  data,
  imgPath,
  uid,
}: props) {
  useEffect(() => {
    //subscribeToNewChat();
    // it is work for connect mutationn and query at subscription
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {data &&
        data.map((el: ChatLog, index: number) => (
          <ChatBubble
            key={index}
            imgPath={imgPath}
            uid={uid}
            chatLog={el}></ChatBubble>
        ))}
    </>
  );
}
export default BubbleCreator;

import React, { useCallback, useEffect, useState } from "react";
import { useSubscription } from "@apollo/client";
import { CHECK_CHAT_ACTION_SUB } from "@query/publicChatQuery";

import ChatBubble from "./ChatBubble";

import { ChatLog } from "@type/chatType";
import { imgPath } from "@type/userInfo";
type props = {
  /* subscribeToNewChat: any; */
  chatRoom: string;
  imgPath: imgPath;
  uid: string;
};

function BubbleCreator({
  /* subscribeToNewChat, */
  chatRoom,
  imgPath,
  uid,
}: props) {
  /*   useEffect(() => {
    subscribeToNewChat();
    // it is work for connect mutationn and query at subscription
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); */
  const { data, loading, error } = useSubscription(CHECK_CHAT_ACTION_SUB, {
    variables: {
      chatRoom,
    },
  });
  const [message, setMessage] = useState<ChatLog[]>([]);

  useEffect(() => {
    if (data) {
      const newMessage = data.CheckChat;
      setMessage((coldMessage) => [...coldMessage, newMessage]);
    }
  }, [data]);

  const renderItem = useCallback(
    // preventing rerendering
    () =>
      message.map((el: ChatLog, index: number) => {
        return (
          <ChatBubble
            key={index}
            imgPath={imgPath}
            uid={uid}
            chatLog={el}></ChatBubble>
        );
      }),
    [imgPath, message, uid]
  );

  if (loading) {
    return <></>;
  }
  return <div className="flex flex-col">{data && renderItem()}</div>;
}
export default BubbleCreator;

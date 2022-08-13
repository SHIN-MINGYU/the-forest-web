// 1. hooks or react/next and ...etc built-in function
import React, { useCallback, useEffect, useState } from "react";
import { useSubscription } from "@apollo/client";

// 2. util or hand-made function

// 3. query for graphql
import { CHECK_CHAT_ACTION_SUB } from "@query/publicChatQuery";

// 4. associated with component
import ChatBubble from "./ChatBubble";

// 5. types
import { ChatLog } from "@type/chat.type";
type Props = {
  chatRoom: string;
  uid: string;
};

const BubbleCreator = ({ chatRoom, uid }: Props) => {
  const { data, loading } = useSubscription(CHECK_CHAT_ACTION_SUB, {
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
      message.map((chatLog: ChatLog, index: number) => {
        return (
          <ChatBubble key={index} uid={uid} chatLog={chatLog}></ChatBubble>
        );
      }),
    [message, uid]
  );

  if (loading) {
    return <></>;
  }
  return <div className="flex flex-col">{data && renderItem()}</div>;
};
export default BubbleCreator;

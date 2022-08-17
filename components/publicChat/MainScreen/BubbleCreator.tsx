// 1. hooks or react/next and ...etc built-in function
import React, { useCallback, useEffect, useState } from "react";
import { useSubscription } from "@apollo/client";
import PortalToGNB from "../../modal/PortalToGNB";

// 2. util or hand-made function

// 3. query for graphql
import { CHECK_CHAT_ACTION_SUB } from "@query/publicChatQuery";

// 4. associated with component
import ChatBubble from "./ChatBubble";
import OpponentInfoModal from "./OpponentInfoModal";

// 5. types
import { ChatLog } from "@type/chat.type";
import { UserFromHook } from "../../../types/user.type";

type Props = {
  chatRoom: string;
  uid: string;
  opponentInfo: UserFromHook | UserFromHook[];
};

// View
const BubbleCreator = ({ chatRoom, uid, opponentInfo }: Props) => {
  const { data, loading } = useSubscription(CHECK_CHAT_ACTION_SUB, {
    variables: {
      chatRoom,
    },
  });
  const [message, setMessage] = useState<ChatLog[]>([]);
  const [clickedID, setClickedID] = useState<string>("");

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
          <ChatBubble
            key={index}
            uid={uid}
            onClick={setClickedID}
            chatLog={chatLog}></ChatBubble>
        );
      }),
    [message, uid]
  );

  if (loading) {
    return <></>;
  }
  return (
    <div className="flex flex-col">
      {data && renderItem()}
      {clickedID && (
        <PortalToGNB>
          <OpponentInfoModal
            opponentInfo={
              Array.isArray(opponentInfo)
                ? opponentInfo.filter((el) => el.userInfo._id === clickedID)[0]
                : opponentInfo
            }
            close={() => setClickedID("")}></OpponentInfoModal>
        </PortalToGNB>
      )}
    </div>
  );
};
export default BubbleCreator;

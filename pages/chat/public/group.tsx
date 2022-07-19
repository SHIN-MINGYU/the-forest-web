import { useMyInfo } from "@hooks/useGetMyInfo";
import { useState } from "react";

import { ChatCard, OpponentChatCard } from "@components/publicChat/Card";
import {
  ChatContainer,
  ChatInput,
  ChatScreen,
} from "@components/publicChat/MainScreen";

import { opponentInfo } from "@type/userInfo";
import { chatRoomQuery } from "@type/routingQuery";

const GroupChat = ({ chatRoom }: chatRoomQuery) => {
  const getInfo = useMyInfo();
  const { uid, userType, userInfo } = getInfo();
  const [opponentInfo, setOpponentInfo] = useState<Array<opponentInfo>>([]);
  return (
    <ChatContainer>
      <div className="flex flex-col justify-around items-center">
        <ChatCard userType={userType} userInfo={userInfo}></ChatCard>
        <OpponentChatCard
          opponentInfo={opponentInfo[0]}
          leave={false}></OpponentChatCard>
      </div>
      <div className="w-full md:w-1/2 h-full bg-white  flex flex-col-reverse mb-0 p-0 bottom-0 left-0 right-0">
        <ChatInput
          uid={uid}
          nickname={userInfo.nickname}
          chatRoom={chatRoom}></ChatInput>
        <ChatScreen
          opponentLeave={false}
          opponentType={""}
          imgPath={["", ""]}
          uid={uid}
          chatRoom={chatRoom}></ChatScreen>
      </div>
      <div className="flex flex-col justify-around">
        <OpponentChatCard
          opponentInfo={opponentInfo[1]}
          leave={false}></OpponentChatCard>
        <OpponentChatCard
          opponentInfo={opponentInfo[2]}
          leave={false}></OpponentChatCard>
      </div>
    </ChatContainer>
  );
};

export default GroupChat;

export function getServerSideProps({ query }: { query: chatRoomQuery }) {
  const { chatRoom } = query;
  if (!chatRoom) {
    // if chat room is not exist, return 404 page
    return {
      notFound: true,
    };
  }
  return {
    props: {
      chatRoom,
    },
  };
}

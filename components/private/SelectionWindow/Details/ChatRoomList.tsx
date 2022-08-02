import { chatList, MainData } from "@type/privateRoom";
import { useQuery } from "@apollo/client";
import { Dispatch, SetStateAction } from "react";
import ChatRoomCard from "./Card/ChatRoomCard";
import { GET_PRIVATE_ROOM_LIST_QUE } from "@query/privateChatQuery";

type props = {
  setData: Dispatch<SetStateAction<MainData>>;
};

const ChatRoomList = ({ setData }: props) => {
  const { data } = useQuery(GET_PRIVATE_ROOM_LIST_QUE);

  return (
    <>
      {data &&
        data.GetPrivateRoomList.map((chatList: chatList, index: number) => (
          <ChatRoomCard
            /* private room list */
            height={20}
            key={index}
            chatList={chatList}
            onClick={() => {
              setData({
                type: "ChatDetail",
                chatRoom: chatList.chatRoom,
                opponentNickname: chatList.user[0].nickname,
              });
            }}></ChatRoomCard>
        ))}
    </>
  );
};

export default ChatRoomList;

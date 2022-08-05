import { ChatDetail, chatList, MainData } from "@type/privateRoom";
import { useQuery } from "@apollo/client";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import ChatRoomCard from "./Card/ChatRoomCard";
import { GET_PRIVATE_ROOM_LIST_QUE } from "@query/privateChatQuery";

type props = {
  setData: Dispatch<SetStateAction<MainData>>;
};

const ChatRoomList = ({ setData }: props) => {
  const { data, loading } = useQuery(GET_PRIVATE_ROOM_LIST_QUE, {
    fetchPolicy: "cache-and-network",
  });
  const coldData = useRef();

  useEffect(() => {
    console.log("data : ", data);
    if (data) {
      coldData.current = data;
      console.log(coldData.current);
    }
  }, [data]);

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
              setData((prevData) => {
                return Object.assign({}, { ...prevData }, {
                  type: "ChatDetail",
                  chatRoom: chatList.chatRoom,
                  opponentNickname: chatList.user[0].nickname,
                } as ChatDetail);
              });
            }}></ChatRoomCard>
        ))}
    </>
  );
};

export default ChatRoomList;

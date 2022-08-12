// 1. hooks or react/next built-in function
import { useQuery } from "@apollo/client";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

// 2. util or hand-made function

// 3. query for graphql
import { GET_PRIVATE_ROOM_LIST_QUE } from "@query/privateChatQuery";

// 4. associated with component
import ChatRoomCard from "./Card/ChatRoomCard";

// 5. types
import { ChatDetail, ChatList, MainData } from "types/privateRoom";
type Props = {
  setData: Dispatch<SetStateAction<MainData>>;
};

const ChatRoomList = ({ setData }: Props) => {
  const { data } = useQuery(GET_PRIVATE_ROOM_LIST_QUE, {
    fetchPolicy: "cache-and-network",
  });

  return (
    <>
      {data &&
        data.GetPrivateRoomList.map((chatList: ChatList, index: number) => (
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

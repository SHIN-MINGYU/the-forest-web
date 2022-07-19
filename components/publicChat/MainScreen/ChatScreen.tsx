import { useQuery, useSubscription } from "@apollo/client";
import { ChatLog } from "@type/chatType";
import {
  CHECK_CHAT_ACTION_SUB,
  SEARCH_CHAT_LOG_QUE,
} from "@query/publicChatQuery";
import BubbleCreator from "./BubbleCreator";
import NormalToast from "../../toast/NormalToast";
import { AiFillWarning, FaRegCheckCircle } from "@components/icon";
import { imgPath } from "@type/userInfo";
import { useEffect, useState } from "react";

type props = {
  imgPath: imgPath;
  uid: string;
  chatRoom: string;
  opponentType: string;
  opponentLeave: boolean;
};

function ChatScreen({
  opponentLeave,
  opponentType,
  imgPath,
  uid,
  chatRoom,
}: props) {
  /*   const { subscribeToMore, ...result } = useQuery(SEARCH_CHAT_LOG_QUE, {
    variables: { chatRoom },
  }); */
  const { data, loading, error } = useSubscription(CHECK_CHAT_ACTION_SUB, {
    variables: {
      chatRoom,
    },
  });
  const [message, setMessage] = useState<ChatLog[]>([]);
  useEffect(() => {
    if (data) {
      const newMessage = [data.CheckChat];
      setMessage((prevState) => newMessage.concat(prevState));
    }
  }, [data]);
  console.log(message);
  //subscribeToMore is working
  //if mutaition is occur, subscription is catch about that,
  //then update is detected because of subscription, then query is update
  return (
    <div
      className="overflow-scroll overflow-x-hidden h-full flex flex-col-reverse
    scrollbar scrollbar-thumb-green-600 scrollbar-track-gray-100 active:scrollbar-thumb-green-700">
      {!opponentType && (
        /* when opponent user is not exist, send loading circular */
        <NormalToast
          info="loading"
          message="please wating for match!"
          circular
        />
      )}
      {opponentType && (
        /* when opponent enter the room, send success message*/
        <NormalToast
          Icon={FaRegCheckCircle}
          info="success"
          message="matched!"
        />
      )}
      {opponentLeave && (
        /* when opponent is exit from room, send warning message */
        <NormalToast
          Icon={AiFillWarning}
          info="warning"
          message="user is left on this page! you will be transfered to loading page after 5s"
        />
      )}
      <BubbleCreator data={message} imgPath={imgPath} uid={uid} />
      {/* 
      ! this method is supported by graphql
      but in my logic this statement occur error
      because of remaining prev data
      so if opponent is not exist, deservedly, the img path is not exist , then img tag have not src property 
      */}
      {/*       <BubbleCreator  data={{
        ChatLog: []
      }} imgPath={undefined} uid={""}/> */}
      {/* <div
      className="overflow-scroll overflow-x-hidden h-full flex flex-col-reverse
    scrollbar scrollbar-thumb-green-600 scrollbar-track-gray-100 active:scrollbar-thumb-green-700">
      <BubbleCreator
        {...result}
        imgPath={imgPath}
        uid={uid}
        subscribeToNewChat={
          () =>
            subscribeToMore({
              document: CHECK_CHAT_ACTION_SUB,
              variables: { chatRoom },
              updateQuery: (
                prev: { ChatLog: [ChatLog] },
                {
                  subscriptionData,
                }: { subscriptionData: { data: { CheckChat: [ChatLog] } } }
              ) => {
                if (!subscriptionData.data) {
                  return prev;
                }
                const newChat: Array<ChatLog> = subscriptionData.data.CheckChat;
                return Object.assign({}, prev, {
                  ChatLog: [newChat, ...prev.ChatLog],
                });
              },
            })
          //subscribeToMore(
          //  document : subscripbtion,
          //  variables : send variabels to subscription
          //  updateQuery : combine old chatLog and new chatLog to Array )
        }
      /> */}
    </div>
  );
}
export default ChatScreen;

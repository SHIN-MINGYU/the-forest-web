import BubbleCreator from "./BubbleCreator";
import SingleUserToast from "./toastGroup/SingleUserToast";

import { opponentInfoType, imgPath } from "@type/userInfo";
import { leaveEvent } from "@type/chatType";
import MultiUserToast from "./toastGroup/MultiUserToast";
type props = {
  imgPath: imgPath;
  uid: string;
  chatRoom: string;
  opponentInfo: opponentInfoType | opponentInfoType[] | undefined;
  opponentLeave: leaveEvent | undefined;
};

function ChatScreen({
  opponentLeave,
  opponentInfo,
  imgPath,
  uid,
  chatRoom,
}: props) {
  /*   const { subscribeToMore, ...result } = useQuery(SEARCH_CHAT_LOG_QUE, {
    variables: { chatRoom },
  }); */
  //subscribeToMore is working
  //if mutaition is occur, subscription is catch about that,
  //then update is detected because of subscription, then query is update

  return (
    <div
      className="overflow-scroll overflow-x-hidden h-full flex flex-col-reverse
    scrollbar scrollbar-thumb-green-600 scrollbar-track-gray-100 active:scrollbar-thumb-green-700"
    >
      <>
        {!Array.isArray(opponentInfo) && (
          <SingleUserToast
            opponentLeave={opponentLeave}
            opponentInfo={opponentInfo}
          ></SingleUserToast>
        )}
        {Array.isArray(opponentInfo) && (
          <MultiUserToast
            opponentLeave={opponentLeave}
            opponentInfo={opponentInfo}
          ></MultiUserToast>
        )}
        <BubbleCreator chatRoom={chatRoom} imgPath={imgPath} uid={uid} />
      </>

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

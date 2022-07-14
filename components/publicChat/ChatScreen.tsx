import { useQuery } from "@apollo/client";
import { ChatLog } from "@type/chatType";
import {
  CHECK_CHAT_ACTION_SUB,
  SEARCH_CHAT_LOG_QUE,
} from "@query/publicChatQuery";
import BubbleCreator from "./BubbleCreator";

type props = {
  imgPath: Array<string>;
  uid: string;
  chatRoom: string;
};

function ChatScreen({ imgPath, uid, chatRoom }: props) {
  const { subscribeToMore, ...result } = useQuery(SEARCH_CHAT_LOG_QUE, {
    variables: { chatRoom: chatRoom },
  });

  //subscribeToMore is working
  //if mutaition is occur, subscription is catch about that,
  //then update is detected because of subscription, then query is update
  return (
    <>
      <BubbleCreator
        {...result}
        imgPath={imgPath}
        uid={uid}
        subscribeToNewChat={
          () =>
            subscribeToMore({
              document: CHECK_CHAT_ACTION_SUB,
              variables: { chatRoom: chatRoom },
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
      />
    </>
  );
}
export default ChatScreen;

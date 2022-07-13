import { useQuery } from "@apollo/client";
import { ChatLog } from "@type/chatType";
import {
  CHECK_CHAT_ACTION_SUB,
  SEARCH_CHAT_LOG_QUE,
} from "@query/publicChatQuery";
import BubbleCreator from "./BubbleCreator";

function ChatScreen({ chatRoom }: { chatRoom: string }) {
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
                  console.log(prev);
                  return prev;
                }
                console.log(subscriptionData);
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

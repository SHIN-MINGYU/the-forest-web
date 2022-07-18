import { useQuery } from "@apollo/client";
import { ChatLog } from "@type/chatType";
import {
  CHECK_CHAT_ACTION_SUB,
  SEARCH_CHAT_LOG_QUE,
} from "@query/publicChatQuery";
import BubbleCreator from "./BubbleCreator";
import NormalToast from "../toast/NormalToast";
import { AiFillWarning, FaRegCheckCircle } from "@components/icon";

type props = {
  imgPath: Array<string>;
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
      <div className="flex flex-col items-center">
        {!opponentType && (
          /* if opponent user is not exist loading circular */
          <NormalToast
            info="loading"
            message="please wating for match!"
            circular
          />
        )}
        {opponentType && (
          <NormalToast
            Icon={FaRegCheckCircle}
            info="success"
            message="matched!"
          />
        )}
        {opponentLeave && (
          <NormalToast
            Icon={AiFillWarning}
            info="warning"
            message="user is left on this page! you will be transfered to loading page after 5s"
          />
        )}
      </div>
    </>
  );
}
export default ChatScreen;

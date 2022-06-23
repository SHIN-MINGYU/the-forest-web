import { gql, useQuery } from "@apollo/client";
import BubbleCreator from "./BubbleCreator";

const SEARCH_CHAT_LOG = gql`
  query ($chatRoom: ID!) {
    ChatLog(chat_room: $chatRoom) {
      log
      createAt
    }
  }
`;

const CHECK_CHAT_ACTION = gql`
  subscription ($chatRoom: ID!) {
    CheckChat(chat_room: $chatRoom) {
      log
      createAt
    }
  }
`;
function ChatScreen({ chatRoom }: any) {
  const { subscribeToMore, ...result } = useQuery(SEARCH_CHAT_LOG, {
    variables: { chatRoom: chatRoom },
  });
  return (
    <>
      <BubbleCreator
        {...result}
        subscribeToNewChat={() =>
          subscribeToMore({
            document: CHECK_CHAT_ACTION,
            variables: { chatRoom: chatRoom },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) {
                return prev;
              }
              console.log(prev);
              const newChat = subscriptionData.data.CheckChat;
              return Object.assign({}, prev, {
                ChatLog: [newChat, ...prev.ChatLog],
              });
            },
          })
        }
      />
    </>
  );
}
export default ChatScreen;

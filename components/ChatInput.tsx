import { gql, useMutation } from "@apollo/client";
import { ObjectId } from "bson";
import { useState } from "react";
const SEND_CHAT = gql`
  mutation onSendChat(
    $chat_room: ID!
    $log: String
    $uid: ID
    $createAt: Date
  ) {
    SendChat(chat_room: $chat_room, log: $log, uid: $uid, createAt: $createAt)
  }
`;

function ChatInput({ chatRoom }: { chatRoom: string }) {
  const [message, setMessage] = useState<string>("");
  const [sendChat, { data, loading, error }] = useMutation(SEND_CHAT);
  if (error) {
    console.log(error);
  }
  return (
    <>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="h-full w-5/6"
        placeholder="asdfadfs"></input>
      <button
        onClick={() => {
          sendChat({
            variables: {
              chat_room: chatRoom,
              log: message,
              uid: new ObjectId().toString(),
              createAt: new Date().toISOString(),
            },
          });
          setMessage("");
        }}
        className="h-full w-1/6  bg-green-200">
        send
      </button>
    </>
  );
}
export default ChatInput;

import { gql, useMutation } from "@apollo/client";
import { useRef, useState } from "react";
import useInput from "../../hooks/useInput";
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
  const { reset, ...message } = useInput("");
  const sendButton = useRef<HTMLButtonElement>(null);
  const [sendChat, { data, loading, error }] = useMutation(SEND_CHAT);
  //sendChat mutation
  if (error) {
    console.log(error);
  }
  return (
    <>
      <input
        {...message}
        /* 
        value = value
        onChange = onChange
        */
        className="w-5/6 h-full focus:outline-none"
        onKeyDown={(e) => {
          let key = e.key || e.keyCode;
          if (key === "Enter" || key === 13) {
            if (sendButton.current) sendButton?.current.click();
          }
        }}
        placeholder="input some massage"></input>
      <button
        ref={sendButton}
        onClick={() => {
          sendChat({
            variables: {
              chat_room: chatRoom,
              log: message.value,
              uid: sessionStorage.getItem("user"),
              createAt: new Date().toISOString(),
            },
          });
          reset();
        }}
        className="h-full w-1/6  bg-green-200">
        send
      </button>
    </>
  );
}
export default ChatInput;

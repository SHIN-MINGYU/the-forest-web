import { useMutation } from "@apollo/client";
import { useRef } from "react";
import useInput from "@hooks/useInput";
import { SEND_CHAT_MUT } from "@query/publicChatQuery";
type props = {
  uid: string;
  nickname: string;
  chatRoom: string;
};

function ChatInput({ uid, nickname, chatRoom }: props) {
  const { reset, ...message } = useInput("");
  const sendButton = useRef<HTMLButtonElement>(null);
  const [sendChat] = useMutation(SEND_CHAT_MUT);
  //sendChat mutation

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
          let key = e.key;
          if (key === "Enter") {
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
              uid: uid,
              nickname,
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

import { useMutation } from "@apollo/client";
import { useRef } from "react";
import useInput from "@hooks/useInput";

import { SEND_CHAT_MUT } from "@query/publicChatQuery";
import { useMyInfo } from "@hooks/useGetMyInfo";

type props = {
  chatRoom: string;
};

function ChatInput({ chatRoom }: props) {
  const {
    uid,
    userInfo: { nickname },
  } = useMyInfo()();
  const { reset, ...message } = useInput("");
  const sendButton = useRef<HTMLButtonElement>(null);
  const [sendChat] = useMutation(SEND_CHAT_MUT);
  //sendChat mutation

  return (
    <div className="text-center h-12">
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
        placeholder="input some massage"
      ></input>
      <button
        ref={sendButton}
        onClick={() => {
          sendChat({
            variables: {
              chat_room: chatRoom,
              log: message.value,
              uid,
              nickname,
              createAt: new Date().toISOString(),
            },
          });
          reset();
        }}
        className="h-full w-1/6  bg-green-200"
      >
        send
      </button>
    </div>
  );
}
export default ChatInput;

// 1. hooks or react/next and ...etc built-in function
import { useMutation } from "@apollo/client";
import { useRef } from "react";
import useInput from "@hooks/useInput";

// 2. util or hand-made function

// 3. query for graphql
import { SEND_CHAT_MUT } from "@query/publicChatQuery";

// 4. associated with component

// 5. types
import { UserInfo } from "types/user.type";
type Props = {
  chatRoom: string;
  userInfo: Omit<UserInfo, "status">;
};

function ChatInput({ chatRoom, userInfo }: Props) {
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
        placeholder="input some massage"></input>
      <button
        ref={sendButton}
        onClick={() => {
          sendChat({
            variables: {
              chat_room: chatRoom,
              log: message.value,
              uid: userInfo._id,
              nickname: userInfo.nickname,
              imgPath: userInfo.imgPath,
              createAt: new Date().toISOString(),
            },
          });
          reset();
        }}
        className="h-full w-1/6  bg-green-200">
        send
      </button>
    </div>
  );
}
export default ChatInput;

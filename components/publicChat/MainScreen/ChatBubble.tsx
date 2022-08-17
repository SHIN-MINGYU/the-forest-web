// 1. hooks or react/next and ...etc built-in function
import Image from "next/image";
import moment from "moment";
import React, { Dispatch, SetStateAction } from "react";

// 2. util or hand-made function

// 3. query for graphql

// 4. associated with component

// 5. types
import { ChatLog } from "@type/chat.type";

type Props = {
  chatLog: ChatLog;
  // 0 : current user's img
  // 1 : opponent user's img
  uid: string;
  onClick: Dispatch<SetStateAction<string>>;
};

function ChatBubble({ chatLog, uid, onClick }: Props) {
  //Chat Bubble Component
  const MY_CHAT: boolean = chatLog.uid === uid;

  return (
    <div className={`flex items-start px-6 ${MY_CHAT ? "justify-end" : ""}`}>
      {!MY_CHAT && (
        <div onClick={() => onClick(uid)} className="mt-2">
          <Image
            className="rounded-full"
            src={chatLog.imgPath}
            width={50}
            height={50}
            alt="user profile"></Image>
        </div>
      )}

      {/* profile image */}
      <div className={`flex flex-col m-2 mx-4 ${MY_CHAT && "items-end"}`}>
        {/* chat container */}
        <p className="font-bold text-lg">{chatLog.nickname}</p>
        <div
          className={`relative w-fit max-w-lg px-5 py-2 rounded-xl ${
            MY_CHAT
              ? "rounded-tr-none bg-red-200"
              : "rounded-tl-none bg-red-400"
          } text-white`}>
          <p>{chatLog.log}</p>
          <div
            className={`absolute top-0 ${MY_CHAT && "right-0"} w-0 h-0 ${
              MY_CHAT ? "translate-x-4" : "-translate-x-8"
            } border-b-[10px] border-b-transparent ${
              MY_CHAT
                ? "border-l-[20px] border-l-red-200"
                : "border-r-[20px] border-r-red-400"
            }`}></div>
          {/* triangle for chatBubble */}
        </div>
        <p>{moment(chatLog.createAt).fromNow()}</p>
      </div>
      {MY_CHAT && (
        <div className="mt-2">
          <Image
            className="rounded-full"
            src={chatLog.imgPath}
            width={50}
            height={50}
            alt="user profile"></Image>
        </div>
      )}
    </div>
  );
}

export default React.memo(ChatBubble, (prevProps, nextProps) => {
  return prevProps.chatLog === nextProps.chatLog;
});

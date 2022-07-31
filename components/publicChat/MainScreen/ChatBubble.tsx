import Image from "next/image";
import moment from "moment";
import React from "react";

import { ChatLog } from "@type/chatType";
import { imgPath } from "@type/userInfo";
type props = {
  chatLog: ChatLog;
  imgPath: imgPath;
  // 0 : current user's img
  // 1 : opponent user's img
  uid: string;
};

function ChatBubble({ chatLog, imgPath, uid }: props) {
  //Chat Bubble Component
  const MY_CHAT: boolean = chatLog.uid === uid;

  return (
    <div
      className={
        "px-5 flex flex-row drop-shadow-md " + (MY_CHAT ? "justify-end" : "")
      }
    >
      {!MY_CHAT && (
        <div className="my-auto pr-2">
          <Image
            className="rounded-full border-2 border-black"
            src={imgPath[chatLog.uid]}
            width={50}
            height={50}
            alt="user profile"
          ></Image>
        </div>
      )}
      {/* profile image */}
      <div
        className={" relative flex flex-col " + (MY_CHAT ? "items-end" : "")}
      >
        {/* chat container */}
        <p className="font-bold text-lg">{chatLog.nickname}</p>
        <p
          className={
            "w-fit max-w-lg px-5 py-2 rounded-xl text-white " +
            (MY_CHAT
              ? "bg-green-400 rounded-tr-none"
              : "bg-green-700 rounded-tl-none")
          }
        >
          {chatLog.log}
          {MY_CHAT ? (
            <div className="absolute top-0 right-0 w-0 h-0 translate-x-3 translate-y-7 border-b-[10px] border-b-transparent border-l-[16px] border-l-green-400" />
          ) : (
            <div className="absolute top-0 left-0 w-0 h-0 -translate-x-2 translate-y-7 border-b-[10px] border-b-transparent border-r-[16px] border-r-green-700" />
          )}
          {/* triangle for chatBubble */}
        </p>
        <span>{moment(chatLog.createAt).fromNow()}</span>
      </div>
      {MY_CHAT && (
        <div className="my-auto pl-2">
          <Image
            className="rounded-full"
            src={imgPath[chatLog.uid]}
            width={50}
            height={50}
            alt="user profile"
          ></Image>
        </div>
      )}
    </div>
  );
}

export default React.memo(ChatBubble, (prevProps, nextProps) => {
  return prevProps.chatLog === nextProps.chatLog;
});

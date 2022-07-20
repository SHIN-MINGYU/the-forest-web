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
      }>
      {!MY_CHAT && (
        <div className="my-auto pl-2">
          <Image
            className="rounded-full border-2 border-black"
            src={imgPath[chatLog.uid]}
            width={50}
            height={50}
            alt="user profile"></Image>
        </div>
      )}
      <div className={"flex flex-col " + (MY_CHAT ? "items-end" : "")}>
        <p className="font-bold text-lg">{chatLog.nickname}</p>
        <p
          className={
            "w-fit max-w-lg px-5 py-2 rounded-xl text-white " +
            (MY_CHAT ? "bg-green-400" : "bg-green-700")
          }>
          {chatLog.log}
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
            alt="user profile"></Image>
        </div>
      )}
    </div>
  );
}

export default React.memo(ChatBubble, (prevProps, nextProps) => {
  return prevProps.chatLog === nextProps.chatLog;
});

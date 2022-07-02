import { getSessionStorage } from "@hooks/SessionStorage";
import { ChatLog } from "@type/chatType";
import Image from "next/image";

function ChatBubble({ chatLog }: { chatLog: ChatLog }) {
  //Chat Bubble Component
  const MY_CHAT: boolean = chatLog.uid === getSessionStorage("user");
  return (
    <div className={"px-5 flex flex-row " + (MY_CHAT ? "justify-end" : "")}>
      {MY_CHAT ? (
        <></>
      ) : (
        <div className="bg-image">
          <Image src="/images/profile.png" width={50} height={50}></Image>
        </div>
      )}
      <div className={"flex flex-col " + (MY_CHAT ? "items-end" : "")}>
        <p className="font-bold text-lg">{chatLog.uid}</p>
        <p
          className={
            "w-fit max-w-lg px-5 py-2 rounded-xl text-white " +
            (MY_CHAT ? "bg-green-700" : "bg-green-400")
          }>
          {chatLog.log}
        </p>
        <span>2002-01-1</span>
      </div>
      {MY_CHAT ? (
        <div className="bg-image">
          <Image src="/images/profile.png" width={50} height={50}></Image>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
export default ChatBubble;

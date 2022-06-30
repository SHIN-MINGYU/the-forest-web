import { getSessionStorage } from "@hooks/SessionStorage";
import { ChatLog } from "@type/chatType";

function ChatBubble({ chatLog }: { chatLog: ChatLog }) {
  //Chat Bubble Component
  const MY_CHAT: boolean = chatLog.uid === getSessionStorage("user");
  return (
    <div className={"pl-3 flex flex-col " + (MY_CHAT ? "items-end" : "")}>
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
  );
}
export default ChatBubble;

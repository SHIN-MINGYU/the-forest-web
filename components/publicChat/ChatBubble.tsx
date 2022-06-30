import { ChatLog } from "../../type/chatType";

function ChatBubble({ chatLog }: { chatLog: ChatLog }) {
  //Chat Bubble Component
  return (
    <div className="pl-3 flex flex-col justify-end">
      <p className="font-bold text-lg">username</p>
      <p className="w-fit max-w-lg bg-green-700 px-5 py-2 rounded-xl text-white">
        {chatLog.log}
      </p>
      <span>{chatLog.createAt.toString()}</span>
    </div>
  );
}
export default ChatBubble;

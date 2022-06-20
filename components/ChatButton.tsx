function ChatBubble() {
  const now = new Date();
  return (
    <div className="pl-3">
      <p className="font-bold text-lg">username</p>
      <div className="flex w-fit max-w-lg bg-blue-700 px-5 py-2 rounded-xl text-white">
        hey
      </div>
      <span>{now.toString()}</span>
    </div>
  );
}
export default ChatBubble;

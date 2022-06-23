function ChatBubble({ log }: any) {
  return (
    <div className="pl-3">
      <p className="font-bold text-lg">username</p>
      <div className="flex w-fit max-w-lg bg-blue-700 px-5 py-2 rounded-xl text-white">
        {log}
      </div>
      <span>asdfafd</span>
    </div>
  );
}
export default ChatBubble;

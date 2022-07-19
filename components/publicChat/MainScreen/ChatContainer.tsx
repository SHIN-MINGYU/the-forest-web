type props = {
  children: JSX.Element | JSX.Element[];
};

const ChatContainer = ({ children }: props) => {
  return (
    <div
      className="w-full bg-[url('/images/chat_background.jpg')] flex overflow-y-hidden justify-around items-around"
      style={{ height: "90vh" }}>
      {children}
    </div>
  );
};

export default ChatContainer;

// 1. hooks or react/next and ...etc built-in function

// 2. util or hand-made function

// 3. query for graphql

// 4. associated with component

// 5. types
type Props = {
  children: JSX.Element | JSX.Element[];
};

const ChatContainer = ({ children }: Props) => {
  return (
    <div
      className="w-full bg-[url('/images/chat_background.jpg')] 
      flex overflow-y-hidden justify-around items-around"
      style={{ height: "90vh" }}>
      {children}
    </div>
  );
};

export default ChatContainer;

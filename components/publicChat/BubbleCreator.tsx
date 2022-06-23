import ChatBubble from "./ChatBubble";
import { useEffect } from "react";

function BubbleCreator(props: any) {
  useEffect(() => {
    props.subscribeToNewChat();
  }, []);
  console.log(props.data);
  return (
    <>
      {props.data &&
        props.data!.ChatLog.map((el: any, index: any) => (
          <ChatBubble key={index} log={el.log}></ChatBubble>
        ))}
    </>
  );
}
export default BubbleCreator;

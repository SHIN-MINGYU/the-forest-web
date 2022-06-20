import Image from "next/image";
import ChatBubble from "../../../components/ChatButton";

function Hello() {
  return (
    <>
      <div className="w-screen h-screen bg-[url('/images/chat_background.jpg')]">
        <div className="md:w-1/2 h-full sm:w-1 bg-white  flex flex-col-reverse mx-auto mb-0 p-0 bottom-0 left-0 right-0">
          <div className="h-12 border text-center">
            <input className="h-full w-5/6" placeholder="asdfadfs"></input>
            <button className="h-full w-1/6  bg-green-200">send</button>
          </div>
          <ChatBubble></ChatBubble>
          <ChatBubble></ChatBubble>
        </div>
      </div>
    </>
  );
}
export default Hello;

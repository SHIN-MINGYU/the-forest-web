import ChatScreen from "../../../components/publicChat/ChatScreen";
import { ObjectId } from "bson";
import ChatInput from "../../../components/ChatInput";
import { useEffect } from "react";

const CHAT_ROOM = new ObjectId().toString();

function Hello() {
  return (
    <>
      <div
        className="w-screen bg-[url('/images/chat_background.jpg')]"
        style={{ height: "90vh" }}>
        <div
          style={{ overflow: "scroll" }}
          className="md:w-1/2 h-full sm:w-1 bg-white  flex flex-col-reverse mx-auto mb-0 p-0 bottom-0 left-0 right-0">
          <div className="h-12 border text-center">
            <ChatInput chatRoom={CHAT_ROOM}></ChatInput>
          </div>
          <ChatScreen chatRoom={CHAT_ROOM}></ChatScreen>
        </div>
      </div>
    </>
  );
}
export default Hello;

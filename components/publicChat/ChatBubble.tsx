import { ChatLog } from "@type/chatType";
import Image from "next/image";
import moment from "moment";

type props = {
  chatLog: ChatLog;
  imgPath: Array<string>;
  // 0 : current user's img
  // 1 : opponent user's img
  uid: string;
};

// Guest에서의 uri 방식떄문에 채팅시 uri개 매번 읽혀서 최적화가 안됨.
// 이럴바에는 서버쪽에 chatRoom/파일 로 만들어놓고 cache처럼 불러오는게 맞을듯함.

function ChatBubble({ chatLog, imgPath, uid }: props) {
  //Chat Bubble Component
  const MY_CHAT: boolean = chatLog.uid === uid;
  return (
    <div className={"px-5 flex flex-row " + (MY_CHAT ? "justify-end" : "")}>
      {/*       {!MY_CHAT && (
        <div className="my-auto pl-2">
          <Image
            className="rounded-full border-2 border-black"
            src={
              imgPath[1].startsWith("http://")
                ? imgPath[1]
                : "data:" + imgPath[1]
            }
            width={50}
            height={50}
            alt="user profile"></Image>
        </div>
      )} */}
      <div className={"flex flex-col " + (MY_CHAT ? "items-end" : "")}>
        <p className="font-bold text-lg">{chatLog.nickname}</p>
        <p
          className={
            "w-fit max-w-lg px-5 py-2 rounded-xl text-white " +
            (MY_CHAT ? "bg-green-700" : "bg-green-400")
          }>
          {chatLog.log}
        </p>
        <span>{moment(chatLog.createAt).fromNow()}</span>
      </div>
      {MY_CHAT && (
        <div className="my-auto pl-2">
          <Image
            className="rounded-full"
            src={
              imgPath[0].startsWith("http://")
                ? imgPath[0]
                : "data:" + imgPath[0]
            }
            width={50}
            height={50}
            alt="user profile"></Image>
        </div>
      )}
    </div>
  );
}
export default ChatBubble;

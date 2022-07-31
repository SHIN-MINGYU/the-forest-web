import { ChatInput } from "@components/publicChat/MainScreen";
import { ChatDetail } from "@type/privateRoom";
import Image from "next/image";

type props = {
  data: ChatDetail;
};

const ChatDetail = ({ data: { chatRoom } }: props) => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="h-16 flex justify-center items-center border-b-2">
        <p className="">nickname</p>
      </div>
      {/* header */}
      <div className="flex-1 border-b-2">
        <div className="flex items-start">
          <div className="mt-2">
            <Image
              src={process.env.NEXT_PUBLIC_API_ENDPOINT + "/img/profile.png"}
              width={40}
              height={40}
              alt="profile"
            ></Image>
          </div>
          <div className="m-2 ml-4">
            <p>nickname</p>
            <div className="relative w-fit max-w-lg px-5 py-2 rounded-xl rounded-tl-none text-white bg-red-200">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est
              adipisci, rem quia voluptas nam neque ipsum vitae, natus molestias
              quas porro soluta, harum modi! Id placeat dolorem saepe nostrum
              odio.
              <div className="absolute top-0 w-0 h-0 -translate-x-8 border-b-[10px] border-b-transparent border-r-[20px] border-r-red-200"></div>
            </div>
            <p>a second ago</p>
          </div>
        </div>
        {/* opponent ChatBubble */}
        <div className="flex items-start justify-end">
          <div className="flex flex-col m-2 mr-4 items-end">
            <p>nickname</p>
            <div className="relative w-fit max-w-lg px-5 py-2 rounded-xl rounded-tr-none text-white bg-red-200">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est
              adipisci, rem quia voluptas nam neque ipsum vitae, natus molestias
              quas porro soluta, harum modi! Id placeat dolorem saepe nostrum
              odio.
              <div className="absolute top-0 right-0 w-0 h-0 translate-x-4 border-b-[10px] border-b-transparent border-l-[20px] border-l-red-200"></div>
            </div>
            <p>a second ago</p>
          </div>
          <div className="mt-2">
            <Image
              src={process.env.NEXT_PUBLIC_API_ENDPOINT + "/img/profile.png"}
              width={40}
              height={40}
              alt="profile"
            ></Image>
          </div>
        </div>
        {/* myBubble */}
      </div>
      {/* main */}
      <ChatInput chatRoom={chatRoom} />
      {/* input */}
    </div>
  );
};

export default ChatDetail;

import { Dispatch, SetStateAction } from "react";
import ChatRoomCard from "./Card/ChatRoomCard";

type props = {
  setData: Dispatch<SetStateAction<any>>;
};

type chatList = {
  imgPath: string;
  nickname: string;
  chatLog: string;
  afterNow: string;
};

const testData: chatList[] = [
  {
    imgPath: process.env.NEXT_PUBLIC_API_ENDPOINT + "/img/profile.png",
    nickname: "test1",
    chatLog: "have a good day thank you",
    afterNow: "1 min ago",
  },
  {
    imgPath: process.env.NEXT_PUBLIC_API_ENDPOINT + "/img/profile.png",
    nickname: "test2",
    chatLog: "how about you?",
    afterNow: "1 min ago",
  },
  {
    imgPath: process.env.NEXT_PUBLIC_API_ENDPOINT + "/img/profile.png",
    nickname: "test3",
    chatLog: "how did you think about this coding style",
    afterNow: "1 min ago",
  },
  {
    imgPath: process.env.NEXT_PUBLIC_API_ENDPOINT + "/img/profile.png",
    nickname: "test4",
    chatLog: "well i think i can write more simply",
    afterNow: "1 min ago",
  },
  {
    imgPath: process.env.NEXT_PUBLIC_API_ENDPOINT + "/img/profile.png",
    nickname: "test5",
    chatLog: "then try!",
    afterNow: "1 min ago",
  },
  {
    imgPath: process.env.NEXT_PUBLIC_API_ENDPOINT + "/img/profile.png",
    nickname: "test6",
    chatLog: "yeah i will see code more more more",
    afterNow: "1 min ago",
  },
  {
    imgPath: process.env.NEXT_PUBLIC_API_ENDPOINT + "/img/profile.png",
    nickname: "test7",
    chatLog: "and try apply in my code",
    afterNow: "1 min ago",
  },
  {
    imgPath: process.env.NEXT_PUBLIC_API_ENDPOINT + "/img/profile.png",
    nickname: "test8",
    chatLog: "i will be leader this society",
    afterNow: "1 min ago",
  },
  {
    imgPath: process.env.NEXT_PUBLIC_API_ENDPOINT + "/img/profile.png",
    nickname: "test9",
    chatLog: "yeah i can do, i will lead to good direction in global world",
    afterNow: "1 min ago",
  },
];

const ChatRoomList = ({ setData }: props) => {
  /* 
        required Info
            1. user ImgPath
            2. user nickname
            3. latest chatLog, afterNow 
    */
  return (
    <>
      {testData &&
        testData.map((chatList: chatList, index: number) => (
          <ChatRoomCard
            height={20}
            key={index}
            chatList={chatList}
            onClick={() => {}}
          ></ChatRoomCard>
        ))}
    </>
  );
};

export default ChatRoomList;

import { useMyInfo } from "@hooks/useGetMyInfo";
import { Dispatch, SetStateAction, useState } from "react";
import UserCard from "./Card/UserCard";

const testData = [
  {
    imgPath: process.env.NEXT_PUBLIC_API_ENDPOINT + "/img/profile.png",
    nickname: "test1",
    description: "have a good day thank you",
    gender: "",
  },
  {
    imgPath: process.env.NEXT_PUBLIC_API_ENDPOINT + "/img/profile.png",
    nickname: "test2",
    description: "how about you?",
    gender: "",
  },
  {
    imgPath: process.env.NEXT_PUBLIC_API_ENDPOINT + "/img/profile.png",
    nickname: "test3",
    description: "how did you think about this coding style",
    gender: "",
  },
  {
    imgPath: process.env.NEXT_PUBLIC_API_ENDPOINT + "/img/profile.png",
    nickname: "test4",
    description: "well i think i can write more simply",
    gender: "",
  },
  {
    imgPath: process.env.NEXT_PUBLIC_API_ENDPOINT + "/img/profile.png",
    nickname: "test5",
    description: "then try!",
    gender: "",
  },
  {
    imgPath: process.env.NEXT_PUBLIC_API_ENDPOINT + "/img/profile.png",
    nickname: "test6",
    description: "yeah i will see code more more more",
    gender: "",
  },
  {
    imgPath: process.env.NEXT_PUBLIC_API_ENDPOINT + "/img/profile.png",
    nickname: "test7",
    description: "and try apply in my code",
    gender: "",
  },
  {
    imgPath: process.env.NEXT_PUBLIC_API_ENDPOINT + "/img/profile.png",
    nickname: "test8",
    description: "i will be leader this society",
    gender: "",
  },
  {
    imgPath: process.env.NEXT_PUBLIC_API_ENDPOINT + "/img/profile.png",
    nickname: "test9",
    description: "yeah i can do, i will lead to good direction in global world",
    gender: "",
  },
];

type props = {
  setData: Dispatch<SetStateAction<any>>;
  title: string;
};

const Friends = ({ setData }: props) => {
  const { userInfo } = useMyInfo()();
  const [friendsVisible, setFriendsVisible] = useState<Boolean>(true);
  // required info
  /* 
        1. imgPath
        2. nickname
        3. description
    */
  return (
    <>
      {/* my info card */}
      <UserCard
        height={32}
        userInfo={userInfo}
        onClick={() => setData(userInfo)}
      ></UserCard>
      {/* contour */}
      <div>
        <div className="flex basis-1/12 border border-gray-300 justify-between px-2 items-center">
          <span>F4F(0)</span>
          <span
            className="cursor-pointer text-xl"
            onClick={() => setFriendsVisible(!friendsVisible)}
            onMouseDown={(e) => e.preventDefault()}
          >
            {friendsVisible ? "▾" : "◂"}
          </span>
        </div>
        {/* freinds cards */}
        {friendsVisible &&
          testData.map((userInfo, index) => {
            return (
              <UserCard
                key={index}
                height={20}
                userInfo={userInfo}
                onClick={() => setData(userInfo)}
              ></UserCard>
            );
          })}
      </div>
    </>
  );
};

export default Friends;

import { gql, useQuery } from "@apollo/client";
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

const GET_F4F_LIST = gql`
  query F4FList {
    GetF4F {
      imgPath
      nickname
      description
      gender
    }
  }
`;

type props = {
  setData: Dispatch<SetStateAction<any>>;
};

const Friends = ({ setData }: props) => {
  const { userInfo } = useMyInfo()();
  const [friendsVisible, setFriendsVisible] = useState<Boolean>(true);
  const { data, loading }: { data: any; loading: boolean } =
    useQuery(GET_F4F_LIST);

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
        height={20}
        userInfo={userInfo}
        onClick={() => setData(userInfo)}
      ></UserCard>
      {/* contour */}
      <div className="flex basis-1/12 border border-gray-300 justify-between items-center">
        <span>F4F({data?.GetF4F.length})</span>
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
        !loading &&
        data?.GetF4F.map((userInfo: any, index: number) => {
          return (
            <UserCard
              key={index}
              height={20}
              userInfo={userInfo}
              onClick={() => setData(userInfo)}
            ></UserCard>
          );
        })}
    </>
  );
};

export default Friends;

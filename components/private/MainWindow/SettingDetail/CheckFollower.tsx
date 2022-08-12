import { useLazyQuery, gql } from "@apollo/client";
import Image from "next/image";
import { useEffect } from "react";
import { userInfo } from "types/userInfo";
import FollowerCard from "./Card/FollowerCard";

const NOT_F4F_FOLLOWER = gql`
  query getNotF4FFollower {
    GetFollowerNotF4F {
      _id
      nickname
      imgPath
      description
    }
  }
`;

const CheckFollower = () => {
  const [getFollower, { data }] = useLazyQuery(NOT_F4F_FOLLOWER);
  useEffect(() => {
    getFollower();
  }, [getFollower]);

  return (
    <>
      <div className="h-5 pl-10 py-1">
        <p className="font-bold">
          Follower ( {data?.GetFollowerNotF4F.length} ){" "}
        </p>
      </div>
      <div className="grid grid-flow-row lg:grid-cols-3 md:grid-cols-2">
        {data &&
          data?.GetFollowerNotF4F.map((el: userInfo, index: number) => {
            return <FollowerCard key={index} {...el} />;
          })}
      </div>
    </>
  );
};

export default CheckFollower;

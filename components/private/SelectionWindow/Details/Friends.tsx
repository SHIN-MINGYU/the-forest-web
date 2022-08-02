import { useQuery } from "@apollo/client";
import { useMyInfo } from "@hooks/useGetMyInfo";
import { Dispatch, SetStateAction, useState } from "react";

import { GET_F4F_LIST } from "@query/userQuery";

import UserCard from "./Card/UserCard";
import { MainData, _userInfo } from "@type/privateRoom";
type props = {
  setData: Dispatch<SetStateAction<MainData>>;
};

const Friends = ({ setData }: props) => {
  const { userInfo } = useMyInfo()();
  const [friendsVisible, setFriendsVisible] = useState<Boolean>(true);
  const { data, loading }: { data: any; loading: boolean } =
    useQuery(GET_F4F_LIST);

  return (
    <>
      {/* my info card */}
      <UserCard height={20} userInfo={userInfo}></UserCard>
      {/* contour */}
      <div className="flex basis-1/12 border border-gray-300 justify-between items-center">
        <span>F4F({data?.GetF4F.length})</span>
        <span
          className="cursor-pointer text-xl"
          onClick={() => setFriendsVisible(!friendsVisible)}
          onMouseDown={(e) => e.preventDefault()}>
          {friendsVisible ? "▾" : "◂"}
        </span>
      </div>
      {/* freinds cards */}
      {friendsVisible &&
        !loading &&
        data?.GetF4F.map((userInfo: _userInfo, index: number) => {
          return (
            <UserCard
              key={index}
              height={20}
              userInfo={userInfo}
              onClick={() =>
                setData({ type: "UserDetail", userInfo })
              }></UserCard>
          );
        })}
    </>
  );
};

export default Friends;

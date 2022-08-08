import Image from "next/image";

import CardContainer from "./Container/CardContainer";

import { userInfo } from "@type/userInfo";
type props = {
  height: number;
  userInfo: userInfo;
  onClick?: () => void;
};

const UserCard = ({ height, userInfo, onClick }: props) => {
  return (
    <CardContainer height={height} onClick={onClick ? onClick : () => {}}>
      <div className="basis-1/4 flex justify-center items-center">
        <Image
          src={userInfo.imgPath}
          width={40}
          height={40}
          alt="profile"></Image>
      </div>
      <div className="basis-2/3 w-72 flex flex-col justify-center overflow-hidden">
        <p>{userInfo.nickname}</p>
        <p className="text-sm text-gray-500 truncate">{userInfo.description}</p>
      </div>
      <>
        {onClick &&
          /* status => user in web
        onClick => the delimeter what me and anothers
        */
          (userInfo.status ? (
            <div className="basis-1/12 flex flex-col justify-center items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <p className="text-xs">online</p>
            </div>
          ) : (
            <div className="basis-1/12 flex flex-col justify-center items-center">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <p className="text-xs">offline</p>
            </div>
          ))}
      </>
    </CardContainer>
  );
};

export default UserCard;

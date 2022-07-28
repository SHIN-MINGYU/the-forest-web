import { userInfo } from "@type/userInfo";
import Image from "next/image";
import UserCardContainer from "./Container/UserCardContainer";

type props = {
  height: number;
  userInfo: userInfo;
  onClick: () => void;
};

const UserCard = ({ height, userInfo, onClick }: props) => {
  return (
    <UserCardContainer onClick={onClick} height={height}>
      <div className="basis-1/4 m-auto">
        <div className="flex flex-col justify-center items-center">
          <Image
            src={userInfo.imgPath || ""}
            width={40}
            height={40}
            alt="profile Img"
          ></Image>
          <div>{userInfo.nickname}</div>
        </div>
      </div>
      <div className="basis-3/4 m-auto">
        <div className="flex flex-col justify-center">
          <span>status</span>
          <div className="text-gray-400">
            <span>{userInfo.description}</span>
          </div>
        </div>
      </div>
    </UserCardContainer>
  );
};

export default UserCard;

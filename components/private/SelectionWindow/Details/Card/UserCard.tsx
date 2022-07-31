import { userInfo } from "@type/userInfo";
import Image from "next/image";
import CardContainer from "./Container/CardContainer";

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
          alt="profile"
        ></Image>
      </div>
      <div className="basis-3/4 w-72 flex flex-col justify-center overflow-hidden">
        <p>{userInfo.nickname}</p>
        <p className="text-sm text-gray-500 truncate">{userInfo.description}</p>
      </div>
    </CardContainer>
  );
};

export default UserCard;

// 1. hooks or react/next and ...etc built-in function
import Image from "next/image";

// 2. util or hand-made function

// 3. query for graphql

// 4. associated with component
import CardContainer from "./Container/CardContainer";

// 5. types
import { UserInfo } from "types/user.type";
type Props = {
  height: number;
  userInfo: UserInfo | Omit<UserInfo, "status">;
  onClick?: () => void;
};

const UserCard = ({ height, userInfo, onClick }: Props) => {
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

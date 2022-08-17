// 1. hooks or react/next and ...etc built-in function;
import Image from "next/image";

// 2. util or hand-made function

// 3. query for graphql

// 4. associated with component
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { MdNotInterested } from "react-icons/md";

// 5. types
import { UserFromHook, UserInfo } from "types/user.type";
import FollowButton from "../FollowButton";
type Props = {
  myInfo?: UserFromHook;
  userType: string;
  userInfo: Omit<UserInfo, "status">;
  opponentLeave?: boolean;
};

const ChatCard = ({ myInfo, userType, userInfo, opponentLeave }: Props) => {
  /* 
    @params 
    userType : user's Type ("USER || GUEST")
    userInfo : Object what have the current user
  */

  const { nickname, gender, description, imgPath } = userInfo;

  return (
    <div
      className={
        "lg:w-72 lg:h-72 md:w-56 md:h-56 m-auto hidden sm:hidden md:flex justify-center items-center " +
        (opponentLeave ? "blur-sm" : "")
      }>
      <div className="p-2 bg-white flex flex-col justify-center items-center rounded-lg">
        <p className="text-xl font-bold">{userType}</p>
        <Image
          className="rounded-full"
          src={imgPath}
          width={150}
          height={150}
          layout={"intrinsic"}
          alt="user profile"></Image>{" "}
        <div>
          <div className="text-center">
            <p className="text-green-600">nickname</p>
            <p className="flex justify-center items-center space-x-2">
              <span>{nickname}</span>

              {gender === "none" && <MdNotInterested></MdNotInterested>}
              {gender === "male" && <BsGenderMale></BsGenderMale>}
              {gender === "female" && <BsGenderFemale></BsGenderFemale>}
            </p>
          </div>
          <div className="lg:w-72 md:w-56 text-center">
            <p className="text-green-600">description</p>
            <p>{description || "Have a good day"}</p>
          </div>
        </div>
        {myInfo && userType === "USER" && myInfo.userType === "USER" && (
          <FollowButton uid={userInfo._id}></FollowButton>
        )}
      </div>
    </div>
  );
};
export default ChatCard;

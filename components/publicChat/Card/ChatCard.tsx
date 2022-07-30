import { useMutation, gql } from "@apollo/client";
import Image from "next/image";

type props = {
  uid?: string;
  userType: string;
  userInfo: {
    nickname: string;
    gender: string;
    description: string;
    imgPath: string;
  };
  opponentLeave?: boolean;
};
const SEND_FOLLOW = gql`
  mutation ($uid: ID!) {
    SendFollow(uid: $uid)
  }
`;

const ChatCard = ({ uid, userType, userInfo, opponentLeave }: props) => {
  /* 
    @params 
    userType : user's Type ("USER || GUEST")
    userInfo : Object what have the current user
  */

  const { nickname, gender, description, imgPath } = userInfo;

  const [onClick] = useMutation(SEND_FOLLOW);

  return (
    <div
      className={
        "lg:w-72 lg:h-72 md:w-56 md:h-56 m-auto hidden sm:hidden md:flex justify-center items-center " +
        (opponentLeave ? "blur-sm" : "")
      }
    >
      <div className="p-2 bg-white flex flex-col justify-center items-center rounded-lg">
        <p className="text-xl font-bold">{userType}</p>
        <Image
          className="rounded-full"
          src={imgPath}
          width={150}
          height={150}
          layout={"intrinsic"}
          alt="user profile"
        ></Image>
        {userType === "USER" && uid && (
          <div className="space-x-3 py-2">
            <button
              onClick={() => onClick({ variables: { uid: uid } })}
              className="border-blue-200 rounded-md border-2 p-1 active:bg-blue-200"
            >
              <span>follow</span>
            </button>
          </div>
        )}
        <div>
          <div>
            <p className="text-green-600">nickname</p>
            <p>{nickname}</p>
          </div>
          <div>
            <p className="text-green-600">gender</p>
            <p>{gender}</p>
          </div>
          <div className="lg:w-72 md:w-56">
            <p className="text-green-600">description</p>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatCard;

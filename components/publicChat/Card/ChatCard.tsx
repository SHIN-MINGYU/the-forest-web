// 1. hooks or react/next and ...etc built-in function
import { useEffect, useState } from "react";
import Image from "next/image";
import { useMutation, useQuery } from "@apollo/client";

// 2. util or hand-made function

// 3. query for graphql
import { GET_FOLLOWING, SEND_FOLLOW, SEND_UNFOLLOW } from "@query/userQuery";

// 4. associated with component

// 5. types
import { UserFromHook, UserInfo } from "types/user.type";
type Props = {
  myInfo?: UserFromHook;
  userType: string;
  userInfo: Omit<UserInfo, "status">;
  opponentLeave?: boolean;
};

const FollowButton = ({ uid }: { uid: string }) => {
  const { data } = useQuery(GET_FOLLOWING, {
    fetchPolicy: "no-cache",
  });
  const [unFollow] = useMutation(SEND_UNFOLLOW);
  const [follow] = useMutation(SEND_FOLLOW);

  const [followed, setFollowed] = useState<boolean>();

  useEffect(() => {
    setFollowed(data?.UserInfo.following.includes(uid));
  }, [data, uid]);

  return (
    <div onClick={() => setFollowed((prevState) => !prevState)}>
      {followed && (
        <div className="space-x-3 py-2">
          <button
            onClick={() => unFollow({ variables: { uid } })}
            className="border-blue-200 rounded-md border-2 p-1 active:bg-blue-200">
            <span>unFollow</span>
          </button>
        </div>
      )}
      {!followed && (
        <div className="space-x-3 py-2">
          <button
            onClick={() => follow({ variables: { uid } })}
            className="border-blue-200 rounded-md border-2 p-1 active:bg-blue-200">
            <span>follow</span>
          </button>
        </div>
      )}
    </div>
  );
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
          alt="user profile"></Image>
        {myInfo && userType === "USER" && myInfo.userType === "USER" && (
          <FollowButton uid={myInfo.userInfo._id}></FollowButton>
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

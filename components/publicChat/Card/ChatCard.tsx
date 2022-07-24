import Image from "next/image";

type props = {
  userType: string;
  userInfo: {
    nickname: string;
    gender: string;
    description: string;
    imgPath: string;
  };
  opponentLeave?: boolean;
};

const ChatCard = ({ userType, userInfo, opponentLeave }: props) => {
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
        <div>
          <div>
            <p className="text-green-600">nickname</p>
            <p>{nickname}</p>
          </div>
          <div>
            <p className="text-green-600">gender</p>
            <p>{gender}</p>
          </div>
          <div>
            <p className="text-green-600">description</p>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatCard;

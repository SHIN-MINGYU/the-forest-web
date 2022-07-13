import Image from "next/image";

type props = {
  userType: string;
  userInfo: {
    nickname: string;
    gender: string;
    description: string;
    imgPath: string;
  };
};

const ChatCard = ({ userType, userInfo }: props) => {
  /* 
    @params 
    userType : user's Type ("USER || GUEST")
    userInfo : Object what have the current user
  */
  const { nickname, gender, description, imgPath } = userInfo;

  return (
    <div className="w-1/4  flex justify-center items-center">
      <div className="w-1/2 h-1/2 bg-white flex flex-col justify-center items-center rounded-lg">
        <p className="text-xl font-bold">{userType}</p>
        <Image
          className="rounded-full"
          src={imgPath.startsWith("http://") ? imgPath : "data:" + imgPath}
          width={200}
          height={200}
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

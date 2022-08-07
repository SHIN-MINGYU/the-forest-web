import { useMutation } from "@apollo/client";
import Image from "next/image";
import { SEND_FOLLOW } from "query/userQuery";

type props = {
  _id: string;
  imgPath: string;
  nickname: string;
  description: string;
};

const FollowerCard = ({ _id, imgPath, nickname, description }: props) => {
  const [sendFollow] = useMutation(SEND_FOLLOW);
  return (
    <div className="h-20 px-4 py-2">
      <div className="z-20 rounded-md h-full border flex">
        <div className="basis-1/4 flex justify-center items-center">
          <Image src={imgPath} width={30} height={30} alt="profile"></Image>
        </div>
        <div className="basis-2/3 flex flex-col justify-center">
          <p>{nickname}</p>
          <p>{description}</p>
        </div>
        <div className="basis-1/12 flex flex-col justify-center space-y-2 p-1">
          <button
            onClick={() =>
              sendFollow({
                variables: {
                  uid: _id,
                },
              })
            }
            className="bg-blue-400 p-auto text-white active:bg-blue-700 active:text-blue-300">
            O
          </button>
          <button className="bg-red-400 p-auto text-white active:bg-red-700 active:text-red-300">
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default FollowerCard;

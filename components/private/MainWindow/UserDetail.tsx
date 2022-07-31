import { useLazyQuery } from "@apollo/client";
import { GET_PRIVATE_ROOM_QUE } from "@query/privateChatQuery";
import { MainData, UserDetail } from "@type/privateRoom";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { AiFillWechat } from "react-icons/ai";
import { IoMdVideocam } from "react-icons/io";

type props = {
  data: UserDetail;
  setData: Dispatch<SetStateAction<MainData>>;
};

const UserDetail = ({ data: { userInfo }, setData }: props) => {
  const [getData] = useLazyQuery(GET_PRIVATE_ROOM_QUE, {
    variables: {
      uid: userInfo._id,
      type: "oneonone",
      category: "private",
    },
  });
  console.log(setData);
  return (
    <>
      {userInfo && (
        <>
          <div className="h-4/5 flex flex-col justify-center items-center space-y-2">
            <div className="rounded-full border border-gray-400 overflow-hidden">
              <Image
                src={userInfo.imgPath}
                width={300}
                height={300}
                alt="profile"
              ></Image>
            </div>
            <p className="text-gray-400">{userInfo.nickname}</p>
            <div>
              <p className="text-center">status</p>
              <p className="text-gray-400">{userInfo.description}</p>
            </div>
          </div>
          <div className="h-1/5 border flex justify-center items-center space-x-5">
            <div
              onClick={async () => {
                const res = await getData();
                const mainData = {
                  type: "ChatDetail",
                  chatRoom: res.data.GetPrivateRoom as String,
                };

                setData(mainData as MainData);
              }}
              className="flex flex-col items-center p-2 rounded-full overflow-hidden border active:bg-green-200"
            >
              <AiFillWechat size={100}></AiFillWechat>
              <p>1:1 chat</p>
            </div>
            <div className="flex flex-col items-center">
              <IoMdVideocam size={100}></IoMdVideocam>
              <p>video chat</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserDetail;

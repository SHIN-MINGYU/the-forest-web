import Image from "next/image";
import { AiFillWechat } from "react-icons/ai";
import { IoMdVideocam } from "react-icons/io";

const MainWindow = ({ data }: any) => {
  console.log(data);
  return (
    <div className="relative basis-3/4">
      {data && (
        <>
          <div className="h-4/5 flex flex-col justify-center items-center space-y-2">
            <div className="rounded-full border border-gray-400 overflow-hidden">
              <Image
                src={data.imgPath}
                width={300}
                height={300}
                alt="profile"
              ></Image>
            </div>
            <p className="text-gray-400">{data.nickname}</p>
            <div>
              <p className="text-center">status</p>
              <p className="text-gray-400">{data.description}</p>
            </div>
          </div>
          <div className="h-1/5 border flex justify-center items-center space-x-5">
            <div className="flex flex-col items-center">
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
    </div>
  );
};

export default MainWindow;

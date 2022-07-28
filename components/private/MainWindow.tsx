import Image from "next/image";

const MainWindow = ({ data }: any) => {
  console.log(data);
  return (
    <div className="relative basis-3/4">
      {data && (
        <>
          <div className="h-4/5 bg-red-200 flex flex-col justify-center items-center space-y-2">
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
          <div className="h-1/5 bg-green-100 flex justify-center items-center">
            <span className="text-2xl">Start Chat!</span>
          </div>
        </>
      )}
    </div>
  );
};

export default MainWindow;

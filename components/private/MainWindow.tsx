import { ChatDetail, MainData, UserDetail } from "@type/privateRoom";
import dynamic from "next/dynamic";
import React, { ComponentType, Dispatch, SetStateAction } from "react";

type props = {
  data: MainData;
  setData: Dispatch<SetStateAction<MainData>>;
};

const MainWindow = ({ data, setData }: props) => {
  const ChatDetail: ComponentType<{ data: ChatDetail }> = dynamic(
    import("./MainWindow/ChatDetail"),
    { ssr: false }
  );
  const UserDetail: ComponentType<{
    data: UserDetail;
    setData: Dispatch<SetStateAction<ChatDetail>>;
  }> = dynamic(import("./MainWindow/UserDetail"), { ssr: false });
  // if designate variable in dynamic import path, all file is built in /MainWindow folder
  // so need care for use

  return (
    <div className="hidden md:block md:basis-3/4">
      {data?.type === "ChatDetail" && <ChatDetail data={data}></ChatDetail>}
      {data?.type === "UserDetail" && (
        <UserDetail
          data={data}
          setData={
            setData as Dispatch<SetStateAction<ChatDetail>>
          }></UserDetail>
      )}
    </div>
  );
};

export default MainWindow;

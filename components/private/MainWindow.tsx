import {
  ChatDetail,
  MainData,
  SettingDetail,
  UserDetail,
} from "@type/privateRoom";
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

  const SettingDetail: ComponentType<{
    data: SettingDetail;
  }> = dynamic(import("./MainWindow/SettingDetail"), { ssr: false });

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
      {data?.type === "Setting Detail" && (
        <SettingDetail data={data}></SettingDetail>
      )}
    </div>
  );
};

export default MainWindow;

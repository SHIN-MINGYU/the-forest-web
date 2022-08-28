// 1. hooks or react/next and ...etc built-in function
import dynamic from "next/dynamic";
import React, { ComponentType, Dispatch, SetStateAction } from "react";

// 2. util or hand-made function

// 3. query for graphql

// 4. associated with component

// 5. types
import {
  ChatDetail,
  MainData,
  SettingDetail,
  UserDetail,
} from "@type/privateRoom.type";
import { UserInfo } from "types/user.type";
type Props = {
  data: MainData;
  setData: Dispatch<SetStateAction<MainData>>;
  userInfo: Omit<UserInfo, "status">;
};

const MainWindow = ({ data, setData, userInfo }: Props) => {
  // @dynamic import start
  const ChatDetail: ComponentType<{
    data: ChatDetail;
    userInfo: Omit<UserInfo, "status">;
  }> = dynamic(import("./MainWindow/ChatDetail"), { ssr: false });
  const UserDetail: ComponentType<{
    data: UserDetail;
    setData: Dispatch<SetStateAction<ChatDetail>>;
  }> = dynamic(import("./MainWindow/UserDetail"), { ssr: false });

  const SettingDetail: ComponentType<{
    data: SettingDetail;
    userInfo: Omit<UserInfo, "status">;
  }> = dynamic(import("./MainWindow/SettingDetail"), { ssr: false });
  // @dynamic import end

  return (
    <div className="hidden md:block md:basis-3/4">
      {data?.type === "ChatDetail" && (
        <ChatDetail data={data} userInfo={userInfo}></ChatDetail>
      )}
      {data?.type === "UserDetail" && (
        <UserDetail
          data={data}
          setData={
            setData as Dispatch<SetStateAction<ChatDetail>>
          }></UserDetail>
      )}
      {data?.type === "Setting Detail" && (
        <SettingDetail userInfo={userInfo!} data={data}></SettingDetail>
      )}
    </div>
  );
};

export default MainWindow;

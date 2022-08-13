// 1. hooks or react/next and ...etc built-in function
import { ComponentType, Dispatch, SetStateAction, useState } from "react";
import dynamic from "next/dynamic";

// 2. util or hand-made function

// 3. query for graphql

// 4. associated with component
import { AiOutlineSetting } from "react-icons/ai";
import { BsChatRightText, BsPeople } from "react-icons/bs";

import MenuContainer from "./SelectionWindow/MenuContainer";

// 5. types
import { MainData } from "@type/privateRoom.type.";
import { UserInfo } from "types/user.type";
type Props = {
  userInfo: Omit<UserInfo, "status">;
  setData: Dispatch<SetStateAction<MainData>>;
};

const SelectionWindow = ({ userInfo, setData }: Props) => {
  // mode => change detail components
  const [mode, setMode] = useState<"Friends" | "ChatRoomList" | "Setting">(
    "Friends"
  );

  const Friends: ComponentType<Props> = dynamic(
    () => import("./SelectionWindow/Details/Friends"),
    {
      ssr: false,
    }
  );
  const ChatRoomList: ComponentType<Omit<Props, "userInfo">> = dynamic(
    () => import("./SelectionWindow/Details/ChatRoomList"),
    { ssr: false }
  );
  const Setting: ComponentType<Omit<Props, "userInfo">> = dynamic(
    () => import("./SelectionWindow/Details/Setting")
  );

  const modeChanger = (mode: "Friends" | "ChatRoomList" | "Setting") => {
    setMode(mode);
    setData(undefined);
  };

  return (
    <div className="flex w-full md:basis-1/4">
      <MenuContainer>
        <BsPeople
          className="cursor-pointer"
          onClick={() => modeChanger("Friends")}
          size={30}></BsPeople>
        <BsChatRightText
          className="cursor-pointer"
          onClick={() => modeChanger("ChatRoomList")}
          values=""
          size={30}></BsChatRightText>
        <AiOutlineSetting
          className="cursor-pointer"
          onClick={() => modeChanger("Setting")}
          size={30}></AiOutlineSetting>
        {/* menu icon end */}
      </MenuContainer>
      <div className="basis-5/6 border overflow-y-scroll scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-gray-100 active:scrollbar-thumb-green-700">
        {mode === "Friends" && (
          <Friends userInfo={userInfo!} setData={setData}></Friends>
        )}
        {mode === "ChatRoomList" && (
          <ChatRoomList setData={setData}></ChatRoomList>
        )}
        {mode === "Setting" && <Setting setData={setData}></Setting>}
      </div>
    </div>
  );
};

export default SelectionWindow;

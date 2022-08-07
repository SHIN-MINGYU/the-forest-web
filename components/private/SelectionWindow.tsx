import { ComponentType, Dispatch, SetStateAction, useState } from "react";
import dynamic from "next/dynamic";

import MenuContainer from "./SelectionWindow/MenuContainer";
import { BsChatRightText, BsPeople } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { MainData } from "@type/privateRoom";

type props = {
  setData: Dispatch<SetStateAction<MainData>>;
};

const SelectionWindow = ({ setData }: props) => {
  // mode => change detail components
  const [mode, setMode] = useState<"Friends" | "ChatRoomList" | "Setting">(
    "Friends"
  );

  const Friends: ComponentType<props> = dynamic(
    () => import("./SelectionWindow/Details/Friends"),
    {
      ssr: false,
    }
  );
  const ChatRoomList: ComponentType<props> = dynamic(
    () => import("./SelectionWindow/Details/ChatRoomList"),
    { ssr: false }
  );
  const Setting: ComponentType<props> = dynamic(
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
        {mode === "Friends" && <Friends setData={setData}></Friends>}
        {mode === "ChatRoomList" && (
          <ChatRoomList setData={setData}></ChatRoomList>
        )}
        {mode === "Setting" && <Setting setData={setData}></Setting>}
      </div>
    </div>
  );
};

export default SelectionWindow;

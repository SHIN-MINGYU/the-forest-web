import { Dispatch, SetStateAction } from "react";
import { RiUserFollowLine } from "react-icons/ri";
import { MainData } from "@type/privateRoom";
import SettingCard from "./Card/SettingCard";

type props = {
  setData: Dispatch<SetStateAction<MainData>>;
};

const Setting = ({ setData }: props) => {
  return (
    <>
      <div className="h-fit pl-2 font-bold">Setting</div>
      <SettingCard
        Icon={RiUserFollowLine}
        value="check your followers (NOT F4F)"
        onClick={() =>
          setData({ type: "Setting Detail", category: "CheckFollower" })
        }></SettingCard>
    </>
  );
};

export default Setting;

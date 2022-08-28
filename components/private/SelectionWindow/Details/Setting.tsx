// 1. hooks or react/next and ...etc built-in function
import { Dispatch, SetStateAction } from "react";

// 2. util or hand-made function

// 3. query for graphql

// 4. associated with component
import { RiUserFollowLine } from "react-icons/ri";
import SettingCard from "./Card/SettingCard";

// 5. types
import { MainData } from "@type/privateRoom.type";
import { MdInvertColors } from "react-icons/md";
import { UserInfo } from "@type/user.type";

type Props = {
  setData: Dispatch<SetStateAction<MainData>>;
};

const Setting = ({ setData }: Props) => {
  return (
    <>
      <div className="h-fit pl-2 font-bold">Setting</div>
      <SettingCard
        Icon={RiUserFollowLine}
        value="check your followers (NOT F4F)"
        onClick={() =>
          setData({ type: "Setting Detail", category: "CheckFollower" })
        }></SettingCard>
      <SettingCard
        Icon={MdInvertColors}
        value="change message color"
        onClick={() =>
          setData({ type: "Setting Detail", category: "ChangeMessageColor" })
        }></SettingCard>
    </>
  );
};

export default Setting;

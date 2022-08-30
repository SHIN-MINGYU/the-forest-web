// 1. hooks or react/next and ...etc built-in function
import { useState } from "react";

// 2. util or hand-made function

// 3. query for graphql

// 4. associated with component
import ChatBubble from "../../../publicChat/MainScreen/ChatBubble";

// 5. types
import { UserInfo } from "types/user.type";
import Pallete from "./Pallete";
import PalleteCard from "./Card/PalletCard";

type Props = {
  userInfo: Omit<UserInfo, "status">;
};

const ChangeMessageColor = ({ userInfo }: Props) => {
  const [color, setColor] = useState("");

  return (
    <div className="w-full h-full p-6 flex">
      <PalleteCard userInfo={userInfo} setColor={setColor} myChat></PalleteCard>
      <PalleteCard userInfo={userInfo} setColor={setColor}></PalleteCard>
    </div>
  );
};

export default ChangeMessageColor;

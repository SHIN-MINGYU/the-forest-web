// 1. hooks or react/next and ...etc built-in function
import dynamic from "next/dynamic";

// 2. util or hand-made function

// 3. query for graphql

// 4. associated with component

// 5. types
import { SettingDetail } from "@type/privateRoom.type";
import { UserInfo } from "types/user.type";
import { ComponentType } from "react";

type Props = {
  data: SettingDetail;
  userInfo: Omit<UserInfo, "status">;
};

const SettingDetail = ({ data, userInfo }: Props) => {
  const CheckFollower = dynamic(import("./SettingDetail/CheckFollower"), {
    ssr: false,
  });
  const ChangeMessageColor: ComponentType<Omit<Props, "data">> = dynamic(
    import("./SettingDetail/ChangeMessageColor"),
    {
      ssr: false,
    }
  );
  return (
    <>
      {data.category === "CheckFollower" && <CheckFollower></CheckFollower>}
      {data.category === "ChangeMessageColor" && (
        <ChangeMessageColor userInfo={userInfo}></ChangeMessageColor>
      )}
    </>
  );
};

export default SettingDetail;

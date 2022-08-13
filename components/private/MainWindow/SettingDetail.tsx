// 1. hooks or react/next and ...etc built-in function
import dynamic from "next/dynamic";

// 2. util or hand-made function

// 3. query for graphql

// 4. associated with component

// 5. types
import { SettingDetail } from "@type/privateRoom.type.";
type Props = {
  data: SettingDetail;
};

const SettingDetail = ({ data }: Props) => {
  const CheckFollower = dynamic(import("./SettingDetail/CheckFollower"), {
    ssr: false,
  });
  return (
    <>{data.category === "CheckFollower" && <CheckFollower></CheckFollower>}</>
  );
};

export default SettingDetail;

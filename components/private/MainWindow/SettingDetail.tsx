import { SettingDetail } from "@type/privateRoom";
import dynamic from "next/dynamic";

type props = {
  data: SettingDetail;
};

const SettingDetail = ({ data }: props) => {
  const CheckFollower = dynamic(import("./SettingDetail/CheckFollower"), {
    ssr: false,
  });
  return (
    <>{data.category === "CheckFollower" && <CheckFollower></CheckFollower>}</>
  );
};

export default SettingDetail;

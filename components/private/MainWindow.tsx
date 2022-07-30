import { MainData } from "@type/privateRoom";
import dynamic from "next/dynamic";
import { ComponentType } from "react";

type props = {
  data: MainData;
};

const MainWindow = ({ data }: props) => {
  const RenderItem: ComponentType<{ data: MainData }> = dynamic(
    () => import(`./MainWindow/${data?.type}`),
    {
      ssr: false,
    }
  );
  return (
    <div className="basis-0 md:basis-3/4">
      <RenderItem data={data}></RenderItem>
    </div>
  );
};

export default MainWindow;

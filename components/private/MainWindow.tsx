import { MainData } from "@type/privateRoom";
import dynamic from "next/dynamic";
import { ComponentType, Dispatch, SetStateAction } from "react";

type props = {
  data: MainData;
  setData: Dispatch<SetStateAction<MainData>>;
};

const MainWindow = ({ data, setData }: props) => {
  const RenderItem: ComponentType<props> = dynamic(
    import(`./MainWindow/${data?.type}`),
    {
      ssr: false,
    }
  ); // if designate variable in dynamic import path, all file is built in /MainWindow folder
  // so need care for use

  return (
    <div className="hidden md:block md:basis-3/4">
      <RenderItem data={data} setData={setData}></RenderItem>
    </div>
  );
};

export default MainWindow;

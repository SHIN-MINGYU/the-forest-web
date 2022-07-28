import {
  ComponentType,
  Dispatch,
  ReactComponentElement,
  SetStateAction,
  useState,
} from "react";
import dynamic from "next/dynamic";

import MenuContainer from "./SelectionWindow/MenuContainer";
import { BsChatRightText, BsPeople } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";

type props = {
  setData: Dispatch<SetStateAction<any>>;
};

const SelectionWindow = ({ setData }: props) => {
  // mode => change detail components
  const [mode, setMode] = useState("Friends");

  // default component in react => ComponentClass<P> | FunctionComponent<P>
  // P => props
  // (dynamic import)'s return type is ComponentType<{}> => Component what have not props
  // so if want press down props to child component at dynamic import,
  // write in the generic arguments what we want to press down props
  const ModeDetail: ComponentType<props> = dynamic(
    () => import(`./SelectionWindow/Details/${mode}`),
    {
      ssr: false,
    }
  );

  const modeChanger = (mode: string) => {
    setMode(mode);
    setData(undefined);
  };
  return (
    <div className="flex basis-1/4">
      <MenuContainer>
        <BsPeople
          className="cursor-pointer"
          onClick={() => modeChanger("Friends")}
          size={30}
        ></BsPeople>
        <BsChatRightText
          className="cursor-pointer"
          onClick={() => modeChanger("ChatList")}
          values=""
          size={30}
        ></BsChatRightText>
        <AiOutlineSetting
          className="cursor-pointer"
          onClick={() => modeChanger("Setting")}
          size={30}
        ></AiOutlineSetting>
      </MenuContainer>
      <div className="basis-5/6 border overflow-y-scroll scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-gray-100 active:scrollbar-thumb-green-700">
        <ModeDetail setData={setData}></ModeDetail>
      </div>
    </div>
  );
};

export default SelectionWindow;
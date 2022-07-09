import { useEffect } from "react";

type props = {
  children: JSX.Element[] | JSX.Element;
  visible: boolean;
};

const DropDownContainer = ({ children, visible }: props) => {
  return (
    <div
      className={`${
        visible ? "opacity-100" : "opacity-0"
      } absolute w-32 space-y-3 mt-3 text-black transition-all bg-white`}>
      {/* childeren arr  */}
      {children}
    </div>
  );
};

export default DropDownContainer;

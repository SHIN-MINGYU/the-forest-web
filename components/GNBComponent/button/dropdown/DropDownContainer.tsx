type props = {
  children: JSX.Element[] | JSX.Element;
  visible: boolean;
};

const DropDownContainer = ({ children, visible }: props) => {
  /* 
    @params 
      children : DropDownConwtent.tsx 
      visible : container's option what display
  */
  return (
    <div
      className={`${
        visible ? "opacity-100" : "opacity-0"
      } absolute w-40 space-y-3 mt-3 text-black transition-all bg-white`}>
      {/* childeren arr  */}
      {children}
    </div>
  );
};

export default DropDownContainer;

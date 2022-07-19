type props = {
  children: JSX.Element[] | JSX.Element;
};

const DropDownContainer = ({ children }: props) => {
  /* 
    @params 
      children : DropDownConwtent.tsx 
      visible : container's option what display
  */
  return (
    <div
      className={` absolute w-40 space-y-3 text-black transition-all bg-white`}>
      {/* childeren arr  */}
      {children}
    </div>
  );
};

export default DropDownContainer;

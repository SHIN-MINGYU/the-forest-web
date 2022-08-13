// 1. hooks or react/next and ...etc built-in function

// 2. util or hand-made function

// 3. query for graphql

// 4. associated with component

// 5. types
type Props = {
  children: JSX.Element[] | JSX.Element;
};

const DropDownContainer = ({ children }: Props) => {
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

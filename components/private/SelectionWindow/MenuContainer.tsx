// 1. hooks or react/next and ...etc built-in function

// 2. util or hand-made function

// 3. query for graphql

// 4. associated with component

// 5. types
type Props = {
  children: JSX.Element | JSX.Element[];
};

const MenuContainer = ({ children }: Props) => {
  return (
    <div className="flex flex-col p-4 basis-1/6 items-center border-r-2 space-y-5">
      {children}
    </div>
  );
};

export default MenuContainer;

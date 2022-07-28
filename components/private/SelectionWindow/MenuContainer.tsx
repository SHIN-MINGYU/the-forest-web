type props = {
  children: JSX.Element | JSX.Element[];
};

const MenuContainer = ({ children }: props) => {
  return (
    <div className="flex flex-col p-4 basis-1/6 items-center border-r-2 space-y-5">
      {children}
    </div>
  );
};

export default MenuContainer;

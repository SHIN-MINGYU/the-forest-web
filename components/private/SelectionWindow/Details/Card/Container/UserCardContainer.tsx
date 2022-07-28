type props = {
  height: number;
  children: JSX.Element | JSX.Element[];
  onClick: () => void;
};

const UserCardContainer = ({ height, children, onClick }: props) => {
  return (
    <div
      className={`flex h-${height} border border-200 hover:bg-red-100 cursor-pointer`}
      onClick={onClick}
      onMouseDown={(e) => e.preventDefault()}
    >
      {children}
    </div>
  );
};

export default UserCardContainer;

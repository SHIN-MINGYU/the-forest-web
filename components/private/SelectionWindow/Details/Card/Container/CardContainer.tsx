type props = {
  height: number;
  children: JSX.Element | JSX.Element[];
  onClick: () => void;
};

const CardContainer = ({ height, children, onClick }: props) => {
  return (
    <div
      className={`flex ${
        height ? `h-${height}` : ""
      } border hover:bg-red-100 cursor-pointer`}
      onClick={onClick}
      onMouseDown={(e) => e.preventDefault()}
    >
      {children}
    </div>
  );
};

export default CardContainer;

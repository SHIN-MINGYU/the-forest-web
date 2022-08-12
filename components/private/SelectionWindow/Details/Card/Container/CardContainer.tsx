// 1. hooks or react/next and ...etc built-in function

// 2. util or hand-made function

// 3. query for graphql

// 4. associated with component

// 5. types
type Props = {
  height: number;
  children: JSX.Element | JSX.Element[];
  onClick: () => void;
};

const CardContainer = ({ height, children, onClick }: Props) => {
  return (
    <div
      className={`flex ${
        height ? `h-${height}` : ""
      } border hover:bg-red-100 cursor-pointer`}
      onClick={onClick}
      onMouseDown={(e) => e.preventDefault()}>
      {children}
    </div>
  );
};

export default CardContainer;

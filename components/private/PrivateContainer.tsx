type props = {
  children: JSX.Element | JSX.Element[];
};

const PrivateContainer = ({ children }: props) => {
  return (
    <div
      className="w-full
      flex overflow-y-hidden justify-around items-around"
      style={{ height: "90vh" }}
    >
      {children}
    </div>
  );
};

export default PrivateContainer;

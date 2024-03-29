// 1. hooks or react/next and ...etc built-in function

// 2. util or hand-made function

// 3. query for graphql

// 4. associated with component

// 5. types
type Props = {
  onClick: () => void;
  title: string;
};

const SendButton = (props: Props) => {
  const { title, ...attribute } = props;
  return (
    <button
      {...attribute}
      className="absolute h-4 flex justify-center items-center
      right-0 text-white bg-gradient-to-r from-blue-500 
      via-blue-600 to-blue-700 hover:bg-gradient-to-br 
      focus:outline-none focus:ring-blue-300 font-medium 
      rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
      {title}
    </button>
  );
};

export default SendButton;

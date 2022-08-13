// 1. hooks or react/next and ...etc built-in function

// 2. util or hand-made function

// 3. query for graphql

// 4. associated with component

// 5. types
import { IconType } from "react-icons";
type Props = {
  Icon: IconType;
  content: string;
  onClick?: () => void;
};

const DropDownContent = ({ Icon, content, onClick }: Props) => {
  /* 
  @params
    Icon : DropDownContent's Icon
    content : introducing movement when onClick event is occured
    onClick : movement
  */
  return (
    <button
      className="flex min-w-full p-2"
      onClick={onClick ? onClick : () => {}}>
      <div className="w-1/5">
        <Icon className="m-auto" size={24}></Icon>
      </div>
      <p className="m-auto">{content}</p>
    </button>
  );
};

export default DropDownContent;

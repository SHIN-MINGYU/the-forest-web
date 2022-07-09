import { IconType } from "react-icons";

type props = {
  Icon: IconType;
  content: string;
  onClick?: () => void;
};

const DropDownContent = ({ Icon, content, onClick }: props) => {
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

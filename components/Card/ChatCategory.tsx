import { IconType } from "react-icons";

type props = {
  Icon: IconType;
  comment: string;
  category: string;
  cardSize: string;
};

const ChatCategoryCard = ({ Icon, comment, category, cardSize }: props) => {
  return (
    <div className="px-10 flex justify-center">
      <div className="sm:w-44 sm:h-44 md:w-72 md:h-72 lg:w-80 lg:h-80 flex px-3 flex-col justify-center items-center bg-green-400 rounded-md">
        <Icon size={100}></Icon>
        <p>{comment}</p>
        <p>{category}</p>
      </div>
    </div>
  );
};
export default ChatCategoryCard;

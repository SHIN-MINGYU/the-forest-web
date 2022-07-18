import { IconType } from "react-icons";

type props = {
  Icon: IconType;
  comment: string;
  category: string;
  onClick: () => Promise<void>;
};

const ChatCategoryCard = ({ Icon, comment, category, onClick }: props) => {
  /* 
  @params 
    Icon : icon of profile
    comment : the sentence what introduce movement if onClick event occured
    category : chat categorying
  */
  return (
    <div
      className="px-10 flex justify-center"
      onClick={(e) => {
        onClick();
      }}>
      <div className="sm:w-44 sm:h-44 md:w-72 md:h-72 lg:w-80 lg:h-80 flex px-3 flex-col justify-center items-center bg-green-400 active:bg-green-600 rounded-md">
        <Icon size={100}></Icon>
        <p>{comment}</p>
        <p>{category}</p>
      </div>
    </div>
  );
};
export default ChatCategoryCard;

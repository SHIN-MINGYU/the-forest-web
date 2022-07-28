import { useEffect, useState } from "react";
import { IconType } from "react-icons";

type props = {
  Icon: IconType;
  comment: string;
  category: string;
  onClick: () => Promise<void>;
  size: number | string;
};

const ChatCategoryCard = ({
  Icon,
  comment,
  category,
  onClick,
  size,
}: props) => {
  /* 
  @params 
    Icon : icon of profile
    comment : the sentence what introduce movement if onClick event occured
    category : chat categorying
    size : card size
  */
  const [sm, setSm] = useState<number | string>();
  const [md, setMd] = useState<number | string>();
  const [lg, setLg] = useState<number | string>(size);
  useEffect(() => {
    if (typeof lg === "number") {
      setMd(lg - 8);
      setSm(lg - 16);
    } else {
      setMd(lg);
      setSm(lg);
    }
  }, [lg]);
  return (
    <div
      className="px-10 flex justify-center"
      onClick={(e) => {
        onClick();
      }}
    >
      <div
        className={`w-full sm:w-${sm} sm:h-64 md:w-${md} md:h-72 lg:w-${lg} lg:h-80 flex px-3 flex-col justify-center items-center bg-green-400 active:bg-green-600 rounded-md`}
      >
        <Icon size={100}></Icon>
        <p>{comment}</p>
        <p>{category}</p>
      </div>
    </div>
  );
};
export default ChatCategoryCard;

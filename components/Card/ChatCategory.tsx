// 1. hooks or react/next and ...etc built-in function
import { useEffect, useState } from "react";

// 2. util or hand-made function

// 3. query for graphql

// 4. associated with component

// 5. types
import { IconType } from "react-icons";

type Props = {
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
}: Props) => {
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
    <div className="px-10 flex min-h-[200px] justify-center">
      <div
        className={`w-full sm:w-${sm} sm:h-64 md:w-${md} md:h-72 lg:w-${lg} lg:h-80 flex px-3 justify-center items-center border border-green-200 active:bg-green-500 active:text-white rounded-md space-x-10`}
        onClick={onClick}>
        <Icon size={60} className="text-black"></Icon>
        <div>
          <p>{comment}</p>
          <p>{category}</p>
        </div>
      </div>
    </div>
  );
};
export default ChatCategoryCard;

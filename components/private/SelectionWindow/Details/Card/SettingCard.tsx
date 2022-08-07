import { IconType } from "react-icons";
import { RiUserFollowLine } from "react-icons/ri";
import CardContainer from "./Container/CardContainer";

type props = {
  Icon: IconType;
  value: string;
  onClick: () => void;
};

const SettingCard = ({ Icon, value, onClick }: props) => {
  return (
    <CardContainer height={20} onClick={onClick}>
      <div className="basis-1/4 flex justify-center items-center">
        <Icon size={30}></Icon>
      </div>
      <div className="basis-3/4 flex justify-center items-center">
        <p className="">{value}</p>
      </div>
    </CardContainer>
  );
};

export default SettingCard;

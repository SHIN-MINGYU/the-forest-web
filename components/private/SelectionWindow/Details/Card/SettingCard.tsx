// 1. hooks or react/next and ...etc built-in function

// 2. util or hand-made function

// 3. query for graphql

// 4. associated with component
import { IconType } from "react-icons";
import CardContainer from "./Container/CardContainer";

// 5. types
type Props = {
  Icon: IconType;
  value: string;
  onClick: () => void;
};

const SettingCard = ({ Icon, value, onClick }: Props) => {
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

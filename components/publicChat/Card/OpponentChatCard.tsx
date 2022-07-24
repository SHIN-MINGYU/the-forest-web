import { opponentInfoType } from "@type/userInfo";
import ChatCard from "./ChatCard";
import DefaultChatCard from "./DefaultChatCard";

type props = {
  opponentInfo: opponentInfoType | undefined;
  leave: boolean;
};

const OpponentChatCard = ({ opponentInfo, leave }: props) => {
  return (
    <>
      {opponentInfo && <ChatCard opponentLeave={leave} {...opponentInfo} />}
      {!opponentInfo && <DefaultChatCard />}
    </>
  );
};

export default OpponentChatCard;

import { opponentInfo } from "@type/userInfo";
import ChatCard from "./ChatCard";
import DefaultChatCard from "./DefaultChatCard";

type props = {
  opponentInfo: opponentInfo;
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

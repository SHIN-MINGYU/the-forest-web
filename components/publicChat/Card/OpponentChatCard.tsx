// 1. hooks or react/next and ...etc built-in function

// 2. util or hand-made function

// 3. query for graphql

// 4. associated with component
import ChatCard from "./ChatCard";
import DefaultChatCard from "./DefaultChatCard";

// 5. types
import { UserFromHook } from "types/user.type";
type Props = {
  myInfo: UserFromHook;
  opponentInfo: UserFromHook | undefined;
  leave: boolean;
};

const OpponentChatCard = ({ myInfo, leave, opponentInfo }: Props) => {
  return (
    <>
      {opponentInfo && (
        <ChatCard myInfo={myInfo} opponentLeave={leave} {...opponentInfo} />
      )}
      {!opponentInfo && <DefaultChatCard />}
    </>
  );
};

export default OpponentChatCard;

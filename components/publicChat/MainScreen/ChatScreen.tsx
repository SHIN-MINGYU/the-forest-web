// 1. hooks or react/next and ...etc built-in function

// 2. util or hand-made function

// 3. query for graphql

// 4. associated with component
import BubbleCreator from "./BubbleCreator";
import SingleUserToast from "./toastGroup/SingleUserToast";
import MultiUserToast from "./toastGroup/MultiUserToast";

// 5. types
import { leaveEvent } from "@type/chat.type";
import { UserFromHook } from "types/user.type";

type Props = {
  uid: string;
  chatRoom: string;
  opponentInfo: UserFromHook | UserFromHook[] | undefined;
  opponentLeave: leaveEvent | undefined;
};

function ChatScreen({ opponentLeave, opponentInfo, uid, chatRoom }: Props) {
  return (
    <div
      className="overflow-scroll overflow-x-hidden h-full flex flex-col-reverse
    scrollbar scrollbar-thumb-green-600 scrollbar-track-gray-100 active:scrollbar-thumb-green-700">
      <>
        {!Array.isArray(opponentInfo) && (
          <SingleUserToast
            opponentLeave={opponentLeave}
            opponentInfo={opponentInfo}></SingleUserToast>
        )}
        {Array.isArray(opponentInfo) && (
          <MultiUserToast
            opponentLeave={opponentLeave}
            opponentInfo={opponentInfo}></MultiUserToast>
        )}
        <BubbleCreator chatRoom={chatRoom} uid={uid} />
      </>
    </div>
  );
}
export default ChatScreen;

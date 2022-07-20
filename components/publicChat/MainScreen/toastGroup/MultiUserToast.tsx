import NormalToast from "../../../toast/NormalToast";
import { AiFillWarning, FaRegCheckCircle } from "@components/icon";

import { opponentInfoType } from "@type/userInfo";
import { leaveEvent } from "@type/chatType";

type props = {
  opponentInfo: opponentInfoType[];
  opponentLeave: leaveEvent | undefined;
};

const MultiUserToast = ({ opponentInfo, opponentLeave }: props) => {
  return (
    <>
      {!opponentInfo && (
        /* when opponent user is not exist, send loading circular */
        <NormalToast
          info="loading"
          message="please wating for match!"
          circular
        />
      )}
      {opponentInfo && (
        /* when opponent enter the room, send success message*/
        <NormalToast
          Icon={FaRegCheckCircle}
          info="success"
          message="matched!"
          timer
        />
      )}
      {opponentLeave && (
        /* when opponent is exit from room, send warning message */
        <NormalToast
          Icon={AiFillWarning}
          info="warning"
          message="user is left on this page! you will be transfered to loading page after 5s"
        />
      )}
    </>
  );
};

export default MultiUserToast;

import NormalToast from "../../../toast/NormalToast";
import { AiFillWarning, FaRegCheckCircle } from "@components/icon";

import { opponentInfoType } from "types/userInfo";
import { leaveEvent } from "types/chatType";

type props = {
  opponentInfo: opponentInfoType | undefined;
  opponentLeave: leaveEvent | undefined;
};

const SingleUserToast = ({ opponentInfo, opponentLeave }: props) => {
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

export default SingleUserToast;

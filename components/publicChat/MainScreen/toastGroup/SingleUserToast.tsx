// 1. hooks or react/next and ...etc built-in function

// 2. util or hand-made function

// 3. query for graphql

// 4. associated with component
import NormalToast from "../../../toast/NormalToast";
import { AiFillWarning, FaRegCheckCircle } from "@components/icon";

// 5. types
import { UserFromHook } from "types/user.type";
import { leaveEvent } from "@type/chat.type";

type props = {
  opponentInfo: UserFromHook | undefined;
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

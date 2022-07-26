import NormalToast from "../../../toast/NormalToast";
import { AiFillWarning, FaRegCheckCircle } from "@components/icon";

import { opponentInfoType } from "@type/userInfo";
import { leaveEvent } from "@type/chatType";
import { useEffect, useRef, useState } from "react";

type props = {
  opponentInfo: opponentInfoType[];
  opponentLeave: leaveEvent | undefined;
};

const MultiUserToast = ({ opponentInfo, opponentLeave }: props) => {
  const [currentNewUser,setCurrentNewUser] = useState(0);
  // ★　i should implements dynamic toast message
  useEffect(()=>{
    if(opponentLeave?.leave) setCurrentNewUser((prevState)=>prevState-1);
    else if(opponentInfo.length === 1 || opponentInfo.length === 0){}
    else setCurrentNewUser((prevState)=>prevState+1);
  },[opponentInfo,opponentLeave])

  return (
    <>
      {!opponentInfo[0] && (
        /* when opponent user is not exist, send loading circular */
        <NormalToast
          info="loading"
          message="please wating for match!"
          circular
        />
      )}
      {opponentInfo[currentNewUser] && (
        /* when opponent enter the room, send success message*/
        <NormalToast
          Icon={FaRegCheckCircle}
          info="success"
          message={`${opponentInfo[0].userInfo.nickname} is enterd`}
          timer
        />
      )}
      {opponentLeave?.leave && (
        /* when opponent is exit from room, send warning message */
        <NormalToast
          Icon={AiFillWarning}
          info="warning"
          message={`${opponentLeave.nickname} is left!`}
        />
      )}
    </>
  );
};

export default MultiUserToast;

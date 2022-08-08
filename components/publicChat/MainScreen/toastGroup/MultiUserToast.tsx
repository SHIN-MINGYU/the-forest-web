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
  const [currentNewUser, setCurrentNewUser] = useState(0);
  const [toastMessage, setToastMessage] = useState<JSX.Element>(
    <NormalToast info="loading" message="please wating for match!" circular />
  );
  // ★　i should implements dynamic toast message

  useEffect(() => {
    if (currentNewUser == 0) {
      setToastMessage(
        <NormalToast
          info="loading"
          message="please wating for match!"
          circular
        />
      );
    }
    if (currentNewUser != 0) {
      setToastMessage(<></>);
    }
    if (currentNewUser < opponentInfo.length) {
      setToastMessage(
        <NormalToast
          Icon={FaRegCheckCircle}
          info="success"
          message={`${
            opponentInfo[opponentInfo.length - 1].userInfo.nickname
          } is enterd`}
          timer
        />
      );
      setCurrentNewUser((prevState) => prevState + 1);
    } else if (currentNewUser > opponentInfo.length) {
      setToastMessage(
        <NormalToast
          Icon={AiFillWarning}
          info="warning"
          message={`${opponentLeave!.nickname} is left!`}
        />
      );
      setCurrentNewUser((prevState) => prevState - 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opponentInfo, opponentLeave]);
  return <>{toastMessage}</>;
};

export default MultiUserToast;

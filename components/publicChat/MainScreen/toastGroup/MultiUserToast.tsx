// 1. hooks or react/next and ...etc built-in function
import { useEffect, useState } from "react";

// 2. util or hand-made function

// 3. query for graphql

// 4. associated with component
import NormalToast from "../../../toast/NormalToast";
import { AiFillWarning, FaRegCheckCircle } from "@components/icon";

// 5. types
import { UserFromHook } from "types/user.type";
import { leaveEvent } from "@type/chat.type";
type Props = {
  opponentInfo: UserFromHook[];
  opponentLeave: leaveEvent | undefined;
};

const MultiUserToast = ({ opponentInfo, opponentLeave }: Props) => {
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

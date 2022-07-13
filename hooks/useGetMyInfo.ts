import { useQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { GET_USER } from "../query/userQuery";
import { getLocalStorage } from "../utils/localStorage";
import { getSessionStorage } from "../utils/sessionStorage";

const initailValue = {
  nickname: "Stranger",
  gender: "none",
  description: "Hello, Nice to meet you. Have a good day",
  imgPath: process.env.NEXT_PUBLIC_API_ENDPOINT + "/img/profile.png",
};

export const useMyInfo = () => {
  const [uid, setUid] = useState<string>("");
  const [userType, setUserType] = useState<string>("");
  const [userInfo, setUserInfo] = useState(initailValue);
  const { ...result } = useQuery(GET_USER);
  useEffect(() => {
    if (result.data) {
      setUserType("User");
      setUid(result.data.UserInfo._id);
      setUserInfo({
        ...result.data.UserInfo,
      });
    } else if (result.error) {
      let getUserInfo = JSON.parse(getLocalStorage("userInfo") || "{}");

      for (let key of Object.keys(initailValue)) {
        if (!getUserInfo[key]) {
          getUserInfo = Object.assign(
            {},
            getUserInfo,
            // @ts-ignore
            JSON.parse(`{ "${key}" : "${initailValue[key]}" }`)
          );
        }
      }
      setUserType("Guest");
      setUid(getSessionStorage("user"));
      setUserInfo(getUserInfo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.loading]);

  const getInfo = useCallback(() => {
    return { uid, userType, userInfo };
  }, [uid, userType, userInfo]);

  return getInfo;
};

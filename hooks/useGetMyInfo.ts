import { useQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { GET_USER } from "../query/userQuery";
import { getLocalStorage } from "../utils/localStorage";
import { getSessionStorage } from "../utils/sessionStorage";

const initailValue = {
  //Guest's initail Value
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
      // if result.data is exist
      // set the value in state
      setUserType("USER");
      setUid(result.data.UserInfo._id);
      setUserInfo({
        ...result.data.UserInfo,
      });
    } else if (result.error) {
      // if error occued
      // 1. inquire localStorage what key is userInfo
      let getUserInfo = JSON.parse(getLocalStorage("userInfo") || "{}");
      // 2. if the Object have not key in initailValue
      for (let key of Object.keys(initailValue)) {
        if (!getUserInfo[key]) {
          // 3. copy the Object and paste that
          getUserInfo = Object.assign(
            {},
            getUserInfo,
            // @ts-ignore
            JSON.parse(`{ "${key}" : "${initailValue[key]}" }`)
          );
        }
      }
      // 4. set the value
      setUserType("GUEST");
      setUid(getSessionStorage("user"));
      setUserInfo(getUserInfo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.loading]);

  const getInfo = useCallback(() => {
    // Immutable for useEffect's second argument
    return { uid, userType, userInfo };
  }, [uid, userType, userInfo]);

  return getInfo;
};

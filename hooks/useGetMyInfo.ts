// 1. hooks or react/next built-in function
import { useQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";

// 2. util or hand-made function
import { API_ENDPOINT } from "utils/loadEnv";
import { getLocalStorage } from "utils/localStorage";
import { getSessionStorage } from "utils/sessionStorage";

// 3. query for graphql
import { GET_USER } from "query/userQuery";
// 4. associated with component

// 5. types
import { UserFromHook, UserInfo } from "types/user.type";
import { IGuest, INotDefined, IUser } from "types/user.interface";

const initailValue: Omit<UserInfo, "_id" | "status"> = {
  //Guest's initail Value
  nickname: "Stranger",
  gender: "none",
  description: "Hello, Nice to meet you. Have a good day",
  imgPath: API_ENDPOINT + "img/profile.png",
};

export const useMyInfo = (): (() => UserFromHook) => {
  const [userType, setUserType] = useState<"GUEST" | "USER" | "">("");
  const [userInfo, setUserInfo] = useState<
    UserInfo | Omit<UserInfo, "_id" | "status">
  >(initailValue);
  const { data, loading, error } = useQuery(GET_USER);
  useEffect(() => {
    if (data) {
      // if data is exist
      // set the value in state
      setUserInfo({
        ...data.UserInfo,
      });
      setUserType("USER");
    } else if (error) {
      // if error occued
      // 1. inquire localStorage what key is userInfo
      let getUserInfo = JSON.parse(getLocalStorage("userInfo") || "{}");

      // 2. if the Object have not key in initailValue
      for (let key of Object.keys(initailValue)) {
        if (!getUserInfo[key]) {
          // 3. copy the Object and paste that
          getUserInfo = Object.assign(
            { _id: getSessionStorage("user") },
            { ...getUserInfo },
            { [`${key}`]: initailValue[key] }
          );
        }
      }
      // 4. set the value
      setUserType("GUEST");
      setUserInfo(getUserInfo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const getInfo = useCallback((): UserFromHook => {
    // Immutable for useEffect's second argument
    if (userType === "GUEST") {
      return { userType, userInfo } as IGuest;
    } else if (userType === "USER") {
      return { userType, userInfo } as IUser;
    } else {
      return {
        userType: "",
        userInfo: initailValue,
      } as INotDefined;
    }
  }, [userType, userInfo]);

  return getInfo;
};

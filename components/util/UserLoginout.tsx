// 1. hooks or react/next and ...etc built-in function
import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";

// 2. util or hand-made function

// 3. query for graphql
const USER_LOGIN = gql`
  mutation Login {
    UserLogin
  }
`;

const USER_LOGOUT = gql`
  mutation Logout {
    UserLogout
  }
`;

// 4. associated with component

// 5. types

const UserLogin = () => {
  const [login] = useMutation(USER_LOGIN);
  const [logout] = useMutation(USER_LOGOUT);

  useEffect(() => {
    login().catch((err) => {
      if (err.message === "GUEST") {
        return null;
      }
    });
    // if user in web page, user's status in db true
  }, [login]);

  if (typeof window != "undefined") {
    window.onbeforeunload = () => {
      logout().catch((err) => {
        if (err.message === "GUEST") {
          return null;
        }
      });
    };
  }
  // if user out of web page , user's status in db false
  return <></>;
};

export default UserLogin;

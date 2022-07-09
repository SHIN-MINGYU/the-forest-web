import { gql } from "@apollo/client";

export const GET_USER_NAME = gql`
  query {
    UserInfo {
      username
    }
  }
`;

export const LOG_OUT = gql`
  mutation {
    LogOut
  }
`;

export const UPDATE_USER_INFO = gql`
  mutation ($nickname: String, $gender: String, $description: String) {
    UpdateUserInfo(
      nickname: $nickname
      gender: $gender
      description: $description
    )
  }
`;

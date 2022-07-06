import { gql } from "@apollo/client";

export const LOG_OUT = gql`
  mutation {
    LogOut
  }
`;

export const GET_USER_NAME = gql`
  query {
    UserInfo {
      username
    }
  }
`;

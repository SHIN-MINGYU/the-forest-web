import { gql } from "@apollo/client";

export const GET_USER_NAME = gql`
  query {
    UserInfo {
      username
      nickname
      imgPath
      description
      gender
    }
  }
`;

export const SEARCH_USER = gql`
  query ($username: String) {
    SearchUser(username: $username)
  }
`;
export const SIGN_UP = gql`
  mutation (
    $username: String!
    $nickname: String!
    $password: String!
    $email: String
  ) {
    SignUp(
      username: $username
      nickname: $nickname
      password: $password
      email: $email
    )
  }
`;

export const LOG_OUT = gql`
  mutation {
    LogOut
  }
`;

export const REQUEST_SEND_MAIL = gql`
  mutation ($email: String!) {
    SendMail(email: $email)
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

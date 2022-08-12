import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUser {
    UserInfo {
      _id
      username
      nickname
      imgPath
      description
      gender
    }
  }
`;

export const SEARCH_USER = gql`
  query searchUser($username: String) {
    SearchUser(username: $username)
  }
`;

export const SIGN_UP = gql`
  mutation signUp(
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
  mutation logOut {
    LogOut
  }
`;

export const REQUEST_SEND_MAIL = gql`
  mutation requestSendMail($email: String!) {
    SendMail(email: $email)
  }
`;

export const UPDATE_USER_INFO = gql`
  mutation updateUserInfo(
    $nickname: String
    $gender: String
    $description: String
  ) {
    UpdateUserInfo(
      nickname: $nickname
      gender: $gender
      description: $description
    )
  }
`;

export const GET_F4F_LIST = gql`
  query F4FList {
    GetF4F {
      _id
      imgPath
      nickname
      description
      gender
      status
    }
  }
`;
export const SEND_FOLLOW = gql`
  mutation sendFollow($uid: ID!) {
    SendFollow(uid: $uid)
  }
`;

export const SEND_UNFOLLOW = gql`
  mutation sendUnfollow($uid: ID!) {
    SendUnFollow(uid: $uid)
  }
`;

export const GET_FOLLOWING = gql`
  query GetFollowing {
    UserInfo {
      following
    }
  }
`;

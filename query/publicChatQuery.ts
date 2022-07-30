import { gql } from "@apollo/client";

export const SEARCH_CHAT_LOG_QUE = gql`
  query ($chatRoom: ID!) {
    ChatLog(chat_room: $chatRoom) {
      log
      createAt
      uid
      nickname
    }
  }
`;

export const LOGIN_QUE = gql`
  query ($username: String!, $password: String!) {
    Login(username: $username, password: $password)
  }
`;

export const CHECK_CHAT_ACTION_SUB = gql`
  subscription ($chatRoom: ID!) {
    CheckChat(chat_room: $chatRoom) {
      log
      uid
      createAt
      nickname
    }
  }
`;

export const SEND_CHAT_MUT = gql`
  mutation onSendChat(
    $chat_room: ID!
    $log: String
    $uid: ID
    $nickname: String
    $createAt: Date
  ) {
    SendChat(
      chat_room: $chat_room
      log: $log
      uid: $uid
      nickname: $nickname
      createAt: $createAt
    )
  }
`;

export const LEAVE_ROOM_MUT = gql`
  mutation ($chatRoom: ID!, $chatType: String!, $nickname: String, $uid: ID) {
    LeaveRoom(
      chat_room: $chatRoom
      chat_type: $chatType
      nickname: $nickname
      uid: $uid
    )
  }
`;

export const LEAVE_ROOM_SUB = gql`
  subscription ($chatRoom: ID!) {
    LeaveRoom(chat_room: $chatRoom) {
      leave
      nickname
      uid
    }
  }
`;

export const ENTER_ROOM_MUT = gql`
  mutation ($chatRoom: ID!, $uid: ID!, $userType: String, $userInfo: String) {
    EnterRoom(
      chat_room: $chatRoom
      uid: $uid
      userType: $userType
      userInfo: $userInfo
    )
  }
`;

export const ENTER_ROOM_SUB = gql`
  subscription ($chatRoom: ID!) {
    EnterRoom(chat_room: $chatRoom) {
      uid
      userType
      userInfo {
        nickname
        gender
        description
        imgPath
      }
    }
  }
`;

export const SEARCH_ROOM_MUT = gql`
  query searchRoom($uid: ID, $type: String!, $category: String!) {
    SearchRoom(uid: $uid, type: $type, category: $category)
  }
`;

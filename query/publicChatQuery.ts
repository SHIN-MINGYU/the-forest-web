import { gql } from "@apollo/client";

export const SEARCH_CHAT_LOG = gql`
  query ($chatRoom: ID!) {
    ChatLog(chat_room: $chatRoom) {
      log
      createAt
      uid
    }
  }
`;

export const CHECK_CHAT_ACTION = gql`
  subscription ($chatRoom: ID!) {
    CheckChat(chat_room: $chatRoom) {
      log
      createAt
      uid
    }
  }
`;

export const SEND_CHAT = gql`
  mutation onSendChat(
    $chat_room: ID!
    $log: String
    $uid: ID
    $createAt: Date
  ) {
    SendChat(chat_room: $chat_room, log: $log, uid: $uid, createAt: $createAt)
  }
`;
export const CHECK_ROOM = gql`
  subscription ($chatRoom: ID!) {
    CheckRoom(chat_room: $chatRoom) {
      leave
    }
  }
`;
export const LEAVE_ROOM = gql`
  mutation ($chatRoom: ID!, $uid: ID) {
    LeaveRoom(chat_room: $chatRoom, uid: $uid)
  }
`;

export const SEARCH_ROOM = gql`
  mutation ($uid: ID, $type: String) {
    SearchRoom(uid: $uid, type: $type)
  }
`;

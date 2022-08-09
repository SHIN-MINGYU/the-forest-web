import { gql } from "@apollo/client";

export const GET_PRIVATE_ROOM_QUE = gql`
  query GetPrivateRoomID($uid: ID!, $type: String!, $category: String!) {
    GetPrivateRoom(uid: $uid, type: $type, category: $category)
  }
`;

export const GET_PRIVATE_ROOM_LIST_QUE = gql`
  query PrivateChatRoomList {
    GetPrivateRoomList {
      user {
        _id
        imgPath
        nickname
      }
      chatRoom
      lastChat
      createAt
    }
  }
`;

export const GET_OFF_CALL_SUB = gql`
  subscription getOffCall($chatRoom: ID) {
    GetOffCall(chat_room: $chatRoom) {
      leave
    }
  }
`;

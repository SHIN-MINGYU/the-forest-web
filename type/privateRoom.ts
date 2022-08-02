import { ObjectId } from "bson";
import { userInfo } from "./userInfo";

export type chatList = {
  user: Array<{
    _id: ObjectId;
    imgPath: string;
    nickname: string;
  }>;
  createAt: string;
  lastChat: string;
  chatRoom: string;
};

export interface _userInfo extends userInfo {
  _id: string;
}

export interface UserDetail {
  type: "UserDetail";
  userInfo: _userInfo;
}

export interface ChatDetail {
  type: "ChatDetail";
  chatRoom: string;
  opponentNickname: string;
}

export type MainData = UserDetail | ChatDetail | undefined;

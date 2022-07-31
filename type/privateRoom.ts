import { userInfo } from "./userInfo";

export type chatList = {
  imgPath: string;
  nickname: string;
  chatLog: string;
  afterNow: string;
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
}

export type MainData = UserDetail | ChatDetail | undefined;

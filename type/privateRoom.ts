import { ObjectId } from "bson";
import { UserInfo } from "./userInfo";

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

export interface UserDetail {
  type: "UserDetail";
  userInfo: UserInfo;
}

export interface ChatDetail {
  type: "ChatDetail";
  chatRoom: string;
  opponentNickname: string;
}

export interface SettingDetail {
  type: "Setting Detail";
  category: string;
}

export type MainData = UserDetail | ChatDetail | SettingDetail | undefined;

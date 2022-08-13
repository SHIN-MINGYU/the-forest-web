import { UserInfo } from "./user.type";

export type ChatList = {
  user: Array<Omit<UserInfo, "description" | "gender" | "status">>;
  createAt: string;
  lastChat: string;
  chatRoom: string;
};

export type UserDetail = {
  type: "UserDetail";
  userInfo: UserInfo;
};

export type ChatDetail = {
  type: "ChatDetail";
  chatRoom: string;
  opponentNickname: string;
};

export type SettingDetail = {
  type: "Setting Detail";
  category: string;
};

export type MainData = UserDetail | ChatDetail | SettingDetail | undefined;

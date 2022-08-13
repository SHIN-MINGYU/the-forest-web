import { IStringToS } from "./signature.interface";
import { UserInfo } from "./user.type";

export interface IUserInfo extends IStringToS {
  _id: string;
  nickname: string;
  imgPath: string;
  description: string;
  gender: string;
}

interface IRequiredInfoInHook {
  userInfo: Omit<UserInfo, "status">;
}

export interface IUser extends IRequiredInfoInHook {
  userType: "USER";
}

export interface IGuest extends IRequiredInfoInHook {
  userType: "GUEST";
}

export interface INotDefined extends IRequiredInfoInHook {
  userType: "";
}

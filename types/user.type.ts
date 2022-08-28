import { IGuest, INotDefined, IUser, IUserInfo } from "./user.interface";

export type UserInfo = IUserInfo & { status: boolean };

// when use useNyInfo hooks returned value's type

export type UserFromHook = IUser | IGuest | INotDefined;

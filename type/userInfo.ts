export interface userInfo {
  _id?: string;
  nickname: string;
  imgPath: string;
  description: string;
  gender?: string;
  status?: boolean;
}

export interface opponentInfoType {
  uid: string;
  userType: string;
  userInfo: userInfo;
}

export interface userInfo {
  nickname: string;
  imgPath: string;
  description: string;
  gender: string;
}

export interface userInfoQuery {
  _id: string;
  nickname: string;
  imgPath: string;
  description: string;
}

export interface opponentInfoType {
  uid: string;
  userType: string;
  userInfo: userInfo;
}

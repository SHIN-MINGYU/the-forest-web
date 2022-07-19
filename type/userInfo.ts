export interface userInfo {
  nickname: string;
  imgPath: string;
  description: string;
  gender: string;
}

export interface opponentInfo {
  userType: string;
  userInfo: userInfo;
}

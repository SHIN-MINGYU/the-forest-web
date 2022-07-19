export interface userInfo {
  nickname: string;
  imgPath: string;
  description: string;
  gender: string;
}

export interface opponentInfo {
  uid: string;
  userType: string;
  userInfo: userInfo;
}

export interface imgPath {
  [key: string]: string;
}

export interface userInfo {
  nickname: string;
  imgPath: string;
  description: string;
  gender: string;
}

export interface userInfoGNB extends userInfo {
  username: string;
}

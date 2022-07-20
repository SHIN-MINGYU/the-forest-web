export type ChatLog = {
  __typename: string;
  uid: string;
  log: string;
  nickname: string;
  createAt: Date;
};

export type leaveEvent = {
  leave: boolean;
  nickname: string;
};

export type ChatLog = {
  __typename: string;
  uid:
    | string
    | {
        _id: string;
        imgPath: string;
        nickname: string;
      };
  log: string;
  createAt: Date;
  imgPath?: string;
  nickname?: string;
};

//  if uid is string => subscribe action
// else => query action

export type leaveEvent = {
  leave: boolean;
  nickname: string;
};

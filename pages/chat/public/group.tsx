import { useMyInfo } from "@hooks/useGetMyInfo";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation, useSubscription } from "@apollo/client";

import { ChatCard, OpponentChatCard } from "@components/publicChat/Card";
import {
  ChatContainer,
  ChatInput,
  ChatScreen,
} from "@components/publicChat/MainScreen";

import { imgPath, opponentInfoType } from "@type/userInfo";
import { chatRoomQuery } from "@type/routingQuery";

import {
  ENTER_ROOM_MUT,
  ENTER_ROOM_SUB,
  LEAVE_ROOM_MUT,
  LEAVE_ROOM_SUB,
} from "@query/publicChatQuery";

const GroupChat = ({ chatRoom }: chatRoomQuery) => {
  // info variables
  const getInfo = useMyInfo();
  const hotFilterdUser = useRef<string>("");
  const { uid, userType, userInfo } = getInfo();
  const [opponentInfo, setOpponentInfo] = useState<Array<opponentInfoType>>([]);
  const [imgPath, setImgPath] = useState<imgPath>({});

  // ENTER ROOM SUBSCRIBE, MUTATION
  const [enterRoom] = useMutation(ENTER_ROOM_MUT);

  const { ...enterEvent } = useSubscription(ENTER_ROOM_SUB, {
    variables: { chatRoom },
  });

  // LEAVE ROOM SUBSCRIBE, MUTATION
  const [leaveRoom] = useMutation(LEAVE_ROOM_MUT, {
    variables: {
      chatRoom,
      chatType: "group",
      nickname: userInfo.nickname,
      uid,
    },
  });

  const { ...leaveEvent } = useSubscription(LEAVE_ROOM_SUB, {
    variables: { chatRoom },
  });

  const cleanUp = useCallback(() => {
    leaveRoom();
    setOpponentInfo([]);
  }, [leaveRoom]);

  useEffect(() => {
    // when componentdidmount my impPath push in imgPath object state
    if (userInfo.imgPath && uid) {
      const obj: { [key: string]: string } = {};
      obj[uid] = userInfo.imgPath;
      setImgPath((prevState) => ({
        ...prevState,
        ...obj,
      }));
    }
  }, [uid, userInfo.imgPath]);

  useEffect(() => {
    /* 
      if user enter the room and have value, enterRoom Mutation occur.
      this mutation is call the enterEvent subscription fields
    */
    if (userType && userInfo) {
      enterRoom({
        variables: {
          uid,
          chatRoom,
          userType,
          userInfo: JSON.stringify(userInfo),
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getInfo]);

  useEffect(() => {
    if (enterEvent.data) {
      //if enterEvent occur
      let isExist = false;
      // if opponentInfo has same user, returned;
      opponentInfo?.forEach((el) => {
        if (
          el.uid === enterEvent.data?.EnterRoom.uid ||
          hotFilterdUser.current === enterEvent.data?.EnterRoom.uid
        ) {
          isExist = true;
        }
      });
      if (!isExist) {
        hotFilterdUser.current = enterEvent.data?.EnterRoom.uid;
        if (enterEvent.data?.EnterRoom.uid !== uid) {
          // set the opponent's info
          const newOpponentArr = [
            {
              uid: enterEvent.data?.EnterRoom.uid,
              userType: enterEvent.data?.EnterRoom.userType,
              userInfo: enterEvent.data?.EnterRoom.userInfo,
            },
          ];
          setOpponentInfo((prevState) => [...prevState, ...newOpponentArr]);
          // [key:string] : string => signiture
          const opponentImgPath: { [key: string]: string } = {};
          const key: string = enterEvent.data?.EnterRoom.uid;
          opponentImgPath[key] = enterEvent.data?.EnterRoom.userInfo.imgPath;
          setImgPath((prevState) => ({
            ...prevState,
            ...opponentImgPath,
          }));
          // and occur one more
          enterRoom({
            variables: {
              uid,
              chatRoom,
              userType,
              userInfo: JSON.stringify(userInfo),
            },
          });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enterEvent.data]);

  useEffect(() => {
    if (leaveEvent.data?.LeaveRoom.leave) {
      //if occur leaveEvent
      //filter same uid what sent by leaveEvent uid, in opponentInfo array
      setOpponentInfo((prevState) => {
        /*         hotFilterdUser.current =
          prevState.find((info) => info.uid === leaveEvent.data?.LeaveRoom.uid)!
            .uid || ""; */
        const filterdArr = prevState.filter(
          (info) => info.uid != leaveEvent.data?.LeaveRoom.uid
        );
        return filterdArr;
      });
    }
  }, [leaveEvent.data?.LeaveRoom]);

  useEffect(() => {
    return () => cleanUp();
  }, [cleanUp]);

  onbeforeunload = () => {
    cleanUp();
  };

  // View
  return (
    <ChatContainer>
      <div className="flex flex-col justify-around items-center">
        <ChatCard userType={userType} userInfo={userInfo}></ChatCard>
        <OpponentChatCard
          opponentInfo={opponentInfo[0]}
          leave={false}
        ></OpponentChatCard>
      </div>
      <div className="w-full md:w-1/2 h-full bg-white  flex flex-col-reverse mb-0 p-0 bottom-0 left-0 right-0 ">
        <ChatInput
          uid={uid}
          nickname={userInfo.nickname}
          chatRoom={chatRoom}
        ></ChatInput>
        <ChatScreen
          opponentLeave={leaveEvent.data?.LeaveRoom}
          opponentInfo={opponentInfo}
          imgPath={imgPath}
          uid={uid}
          chatRoom={chatRoom}
        ></ChatScreen>
      </div>
      <div className="flex flex-col justify-around">
        <OpponentChatCard
          opponentInfo={opponentInfo[1]}
          leave={false}
        ></OpponentChatCard>
        <OpponentChatCard
          opponentInfo={opponentInfo[2]}
          leave={false}
        ></OpponentChatCard>
      </div>
    </ChatContainer>
  );
};

export default GroupChat;

export function getServerSideProps({ query }: { query: chatRoomQuery }) {
  const { chatRoom } = query;
  if (!chatRoom) {
    // if chat room is not exist, return 404 page
    return {
      notFound: true,
    };
  }
  return {
    props: {
      chatRoom,
    },
  };
}

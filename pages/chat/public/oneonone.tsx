import { useCallback, useEffect, useState } from "react";
import { useMutation, useSubscription } from "@apollo/client";
import { useRouter } from "next/router";
import { useMyInfo } from "@hooks/useGetMyInfo";

import {
  ChatScreen,
  ChatInput,
  ChatContainer,
} from "@components/publicChat/MainScreen";
import { ChatCard, OpponentChatCard } from "@components/publicChat/Card";

import {
  LEAVE_ROOM_SUB,
  ENTER_ROOM_MUT,
  ENTER_ROOM_SUB,
  LEAVE_ROOM_MUT,
} from "@query/publicChatQuery";

import { imgPath, opponentInfoType } from "@type/userInfo";
type query = {
  //type of query
  chatRoom: string;
};

let timeOutCancleToken: NodeJS.Timeout; // setTimeout cancel token

function OneOnOneChat({ chatRoom }: query) {
  const router = useRouter();

  // info variables
  const getInfo = useMyInfo();
  const { uid, userType, userInfo } = getInfo();
  const [opponentInfo, setOpponentInfo] = useState<opponentInfoType>();
  const [imgPath, setImgPath] = useState<imgPath>({});

  // ENTERROOM SUBSCRIBE, MUTATION
  const [enterRoom] = useMutation(ENTER_ROOM_MUT);
  const { ...enterEvent } = useSubscription(ENTER_ROOM_SUB, {
    variables: { chatRoom },
  });

  // LEAVEROOM SUBSCRIBE, MUTATION
  const [leaveRoom] = useMutation(LEAVE_ROOM_MUT, {
    variables: {
      chatRoom,
      chatType: "oneonone",
      nickname: userInfo.nickname,
    },
  });

  const { ...leaveEvent } = useSubscription(LEAVE_ROOM_SUB, {
    variables: { chatRoom },
  });

  const cleanUp = useCallback(() => {
    if (timeOutCancleToken) {
      clearTimeout(timeOutCancleToken);
    }
    leaveRoom();
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
      if (!opponentInfo) {
        if (enterEvent.data?.EnterRoom.uid !== uid) {
          // set the opponent's info
          setOpponentInfo((prevState) => ({
            ...prevState,
            ...enterEvent.data?.EnterRoom,
          }));
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
  }, [enterEvent.data, opponentInfo]);

  useEffect(() => {
    //when some user exit from the room
    if (leaveEvent.data?.LeaveRoom.leave) {
      timeOutCancleToken = setTimeout(() => {
        router.back();
      }, 5000);
    }
  }, [leaveEvent, router]);

  useEffect(() => {
    return () => cleanUp();
  }, [cleanUp]);

  onbeforeunload = () => {
    cleanUp();
  };

  //View
  return (
    <ChatContainer>
      <ChatCard userType={userType} userInfo={userInfo}></ChatCard>
      <div className="w-full md:w-1/2 h-full bg-white  flex flex-col-reverse mx-auto mb-0 p-0 bottom-0 left-0 right-0">
        <ChatInput chatRoom={chatRoom}></ChatInput>
        <ChatScreen
          opponentLeave={leaveEvent.data?.LeaveRoom}
          opponentInfo={opponentInfo}
          imgPath={imgPath}
          uid={uid}
          chatRoom={chatRoom}
        ></ChatScreen>
      </div>
      <OpponentChatCard
        opponentInfo={opponentInfo}
        leave={leaveEvent.data?.LeaveRoom.leave}
      ></OpponentChatCard>
    </ChatContainer>
  );
}

export function getServerSideProps({ query }: { query: query }) {
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

export default OneOnOneChat;

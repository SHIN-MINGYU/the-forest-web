// 1. hooks or react/next and ...etc built-in function
import { useMyInfo } from "@hooks/useGetMyInfo";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation, useSubscription } from "@apollo/client";

// 2. util or hand-made function

// 3. query for graphql
import {
  ENTER_ROOM_MUT,
  ENTER_ROOM_SUB,
  LEAVE_ROOM_MUT,
  LEAVE_ROOM_SUB,
} from "@query/publicChatQuery";

// 4. associated with component
import { ChatCard, OpponentChatCard } from "@components/publicChat/Card";
import {
  ChatContainer,
  ChatInput,
  ChatScreen,
} from "@components/publicChat/MainScreen";

// 5. types
import { UserFromHook } from "types/user.type";
type Props = {
  chatRoom: string;
};

const GroupChat = ({ chatRoom }: Props) => {
  // info variables
  const getInfo = useMyInfo();
  const hotFilterdUser = useRef<string>("");
  const { userType, userInfo } = getInfo();
  const [opponentInfo, setOpponentInfo] = useState<Array<UserFromHook>>([]);

  // ENTER ROOM SUBSCRIBE, MUTATION
  const [enterRoom] = useMutation(ENTER_ROOM_MUT);

  const { ...enterEvent } = useSubscription(ENTER_ROOM_SUB, {
    variables: { chatRoom },
    fetchPolicy: "no-cache",
  });

  // LEAVE ROOM SUBSCRIBE, MUTATION
  const [leaveRoom] = useMutation(LEAVE_ROOM_MUT, {
    variables: {
      chatRoom,
      chatType: "group",
      nickname: userInfo.nickname,
      uid: userInfo._id,
    },
  });

  const { ...leaveEvent } = useSubscription(LEAVE_ROOM_SUB, {
    variables: { chatRoom },
    fetchPolicy: "no-cache",
  });

  const cleanUp = useCallback(() => {
    leaveRoom();
    setOpponentInfo([]);
  }, [leaveRoom]);

  useEffect(() => {
    /* 
      if user enter the room and have value, enterRoom Mutation occur.
      this mutation is call the enterEvent subscription fields
    */
    if (userType && userInfo) {
      enterRoom({
        variables: {
          uid: userInfo._id,
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
      console.log(opponentInfo);
      console.log(enterEvent.data?.EnterRoom);
      opponentInfo?.forEach((el) => {
        if (
          el.userInfo._id === enterEvent.data?.EnterRoom.userInfo._id ||
          hotFilterdUser.current === enterEvent.data?.EnterRoom.userInfo._id
        ) {
          isExist = true;
        }
      });
      if (!isExist) {
        hotFilterdUser.current = enterEvent.data?.EnterRoom.userInfo._id;
        if (enterEvent.data?.EnterRoom.userInfo._id !== userInfo._id) {
          // set the opponent's info
          const newOpponentArr = [
            {
              userType: enterEvent.data?.EnterRoom.userType,
              userInfo: enterEvent.data?.EnterRoom.userInfo,
            },
          ];
          setOpponentInfo((prevState) => [...prevState, ...newOpponentArr]);
          // and occur one more
          enterRoom({
            variables: {
              uid: userInfo._id,
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
          (info) => info.userInfo._id != leaveEvent.data?.LeaveRoom.uid
        );
        return filterdArr;
      });
    }
  }, [leaveEvent.data?.LeaveRoom]);

  useEffect(() => {
    return () => cleanUp();
  }, [cleanUp]);

  if (typeof window != "undefined") {
    window.onbeforeunload = () => {
      cleanUp();
    };
  }
  // View
  return (
    <ChatContainer>
      <div className="flex flex-col justify-around items-center">
        <ChatCard userType={userType} userInfo={userInfo}></ChatCard>
        <OpponentChatCard
          myInfo={{ userType, userInfo }}
          opponentInfo={opponentInfo[0]}
          leave={false}></OpponentChatCard>
      </div>
      <div className="w-full md:w-1/2 h-full bg-white  flex flex-col-reverse mb-0 p-0 bottom-0 left-0 right-0 ">
        <ChatInput userInfo={userInfo} chatRoom={chatRoom}></ChatInput>
        <ChatScreen
          opponentLeave={leaveEvent.data?.LeaveRoom}
          opponentInfo={opponentInfo}
          uid={userInfo._id}
          chatRoom={chatRoom}></ChatScreen>
      </div>
      <div className="flex flex-col justify-around">
        <OpponentChatCard
          myInfo={{ userType, userInfo }}
          opponentInfo={opponentInfo[1]}
          leave={false}></OpponentChatCard>
        <OpponentChatCard
          myInfo={{ userType, userInfo }}
          opponentInfo={opponentInfo[2]}
          leave={false}></OpponentChatCard>
      </div>
    </ChatContainer>
  );
};

export default GroupChat;

export function getServerSideProps({ query }: { query: Props }) {
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

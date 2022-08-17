// 1. hooks or react/next and ...etc built-in function
import { useCallback, useEffect, useState } from "react";
import { useMutation, useSubscription } from "@apollo/client";
import { useRouter } from "next/router";
import { useMyInfo } from "@hooks/useGetMyInfo";

// 2. util or hand-made function

// 3. query for graphql
import {
  LEAVE_ROOM_SUB,
  ENTER_ROOM_MUT,
  ENTER_ROOM_SUB,
  LEAVE_ROOM_MUT,
} from "@query/publicChatQuery";

// 4. associated with component
import {
  ChatScreen,
  ChatInput,
  ChatContainer,
} from "@components/publicChat/MainScreen";
import { ChatCard, OpponentChatCard } from "@components/publicChat/Card";

// 5. types
import { UserFromHook } from "types/user.type";

type Props = {
  chatRoom: string;
};

let timeOutCancleToken: NodeJS.Timeout; // setTimeout cancel token

function OneOnOneChat({ chatRoom }: Props) {
  const router = useRouter();

  // info variables
  const getInfo = useMyInfo();
  const { userType, userInfo } = getInfo();
  const [opponentInfo, setOpponentInfo] = useState<UserFromHook>();

  // ENTERROOM SUBSCRIBE, MUTATION
  const [enterRoom] = useMutation(ENTER_ROOM_MUT);
  const { ...enterEvent } = useSubscription(ENTER_ROOM_SUB, {
    variables: { chatRoom },
    fetchPolicy: "cache-first",
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
    /* 
      if user enter the room and have value, enterRoom Mutation occur.
      this mutation is call the enterEvent subscription fields
    */
    if (userType && userInfo) {
      enterRoom({
        variables: {
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
        if (enterEvent.data?.EnterRoom.userInfo._id !== userInfo._id) {
          // set the opponent's info
          setOpponentInfo((prevState) => ({
            ...prevState,
            ...enterEvent.data?.EnterRoom,
          }));
          // and occur one more
          enterRoom({
            variables: {
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
  if (typeof window != "undefined") {
    window.onbeforeunload = (e) => {
      cleanUp();
    };
  }

  //View
  return (
    <ChatContainer>
      <ChatCard userType={userType} userInfo={userInfo}></ChatCard>
      <div className="w-full md:w-1/2 h-full bg-white  flex flex-col-reverse mx-auto mb-0 p-0 bottom-0 left-0 right-0">
        <ChatInput chatRoom={chatRoom} userInfo={userInfo}></ChatInput>
        <ChatScreen
          opponentLeave={leaveEvent.data?.LeaveRoom}
          opponentInfo={opponentInfo}
          uid={userInfo._id}
          chatRoom={chatRoom}></ChatScreen>
      </div>
      <OpponentChatCard
        myInfo={{ userType, userInfo }}
        opponentInfo={opponentInfo}
        leave={leaveEvent.data?.LeaveRoom.leave}></OpponentChatCard>
    </ChatContainer>
  );
}

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

export default OneOnOneChat;

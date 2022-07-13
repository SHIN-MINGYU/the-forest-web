import ChatScreen from "@components/publicChat/ChatScreen";
import ChatInput from "@components/publicChat/ChatInput";
import { useCallback, useEffect, useState } from "react";
import { useMutation, useSubscription } from "@apollo/client";
import { useRouter } from "next/router";
import {
  CHECK_ROOM_SUB,
  ENTER_ROOM_MUT,
  ENTER_ROOM_SUB,
  LEAVE_ROOM_MUT,
} from "@query/publicChatQuery";
import { useMyInfo } from "@hooks/useGetMyInfo";
import ChatCard from "@components/Card/ChatCard";

type query = {
  //type of query
  chatRoom: string;
};

let timeOutCancleToken: NodeJS.Timeout;

function OneOnOneChat({ chatRoom }: query) {
  const router = useRouter();
  const getInfo = useMyInfo();
  const { uid, userType, userInfo } = getInfo();
  const [opponentInfo, setOpponentInfo] = useState({
    userType: "",
    userInfo: {
      nickname: "",
      gender: "",
      description: "",
      imgPath: "",
    },
  });
  const [enterRoom] = useMutation(ENTER_ROOM_MUT);

  const { ...enterEvent } = useSubscription(ENTER_ROOM_SUB, {
    variables: { chatRoom },
  });

  const [leaveRoom] = useMutation(LEAVE_ROOM_MUT, {
    variables: {
      chatRoom,
    },
  });
  const { ...leaveEvent } = useSubscription(CHECK_ROOM_SUB, {
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
      if (!opponentInfo.userType) {
        if (enterEvent.data?.EnterRoom.uid !== uid) {
          // set the opponent's info
          setOpponentInfo((prevState) => ({
            ...prevState,
            userType: enterEvent.data?.EnterRoom.userType,
            userInfo: enterEvent.data?.EnterRoom.userInfo,
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
  }, [enterEvent.data, opponentInfo.userType]);

  useEffect(() => {
    //when some user exit from the room
    if (leaveEvent.data?.CheckRoom.leave) {
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
  return (
    <div
      className="w-full bg-[url('/images/chat_background.jpg')] flex overflow-y-hidden"
      style={{ height: "90vh" }}>
      <ChatCard userType={userType} userInfo={userInfo}></ChatCard>
      <div className="md:w-1/2 h-full sm:w-full bg-white  flex flex-col-reverse mx-auto mb-0 p-0 bottom-0 left-0 right-0">
        <div className="text-center h-12">
          <ChatInput chatRoom={chatRoom}></ChatInput>
        </div>
        <div className="overflow-scroll overflow-x-hidden h-full flex flex-col-reverse">
          <ChatScreen chatRoom={chatRoom}></ChatScreen>
        </div>
      </div>
      <ChatCard {...opponentInfo}></ChatCard>
    </div>
  );
}

export function getServerSideProps({ query }: { query: query }) {
  const { chatRoom } = query;
  return {
    props: {
      chatRoom,
    },
  };
}

export default OneOnOneChat;

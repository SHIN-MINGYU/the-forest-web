// 1. hooks or react/next and ...etc built-in function
import { useQuery, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import Image from "next/image";

// 2. util or hand-made function

// 3. query for graphql
import { GET_OFF_CALL_SUB, GET_USER_IN_CHAT } from "@query/privateChatQuery";

// 4. associated with component
import MainWindow from "components/private/VideoWindow/MainWindow";

// 5. types
type Props = {
  chatRoom: string;
};

const Video = ({ chatRoom }: Props) => {
  const [auth, setAuth] = useState<boolean>(false);

  const { data: user } = useQuery(GET_USER_IN_CHAT, {
    variables: {
      chatRoom,
    },
    fetchPolicy: "network-only",
  });

  const { data } = useSubscription(GET_OFF_CALL_SUB, {
    variables: {
      chatRoom: chatRoom,
    },
  });

  useEffect(() => {
    /*     if (typeof window != "undefined") {
      console.log(window.frames.name);
      if (window.frames.name == "mywindow") { */
    if (!auth) setAuth(true);
    /*       } else {
        location.href = "/404";
      }
    } */
  }, [auth]);

  useEffect(() => {
    if (data?.GetOffCall.leave)
      setTimeout(() => {
        window.close();
      }, 3000);
  }, [data]);

  if (!auth) {
    return <div className="h-screen w-screen bg-black "></div>;
  } else {
    return (
      <div className="relative w-screen h-screen">
        {data?.GetOffCall.leave && (
          <div className="flex flex-col bg-gray-200 w-full h-full justify-center items-center space-y-10">
            <p>{user?.GetUserInChat[0].nickname}</p>
            <Image
              src={user?.GetUserInChat[0].imgPath}
              width={300}
              height={300}
              alt="profile img"></Image>
            <p className="text-2xl">opponent user is getOff your call</p>
            <p>this window will be close after 3 seconds</p>
          </div>
        )}
        {!data?.GetOffCall.leave && user && (
          <MainWindow
            chatRoom={chatRoom}
            opponentInfo={user?.GetUserInChat[0]}
          />
        )}
      </div>
    );
  }
};

export async function getServerSideProps({ query }: any) {
  return {
    props: {
      chatRoom: query.room,
    },
  };
}

export default Video;

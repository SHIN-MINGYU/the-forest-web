import ChatScreen from "@components/publicChat/ChatScreen";
import ChatInput from "@components/publicChat/ChatInput";
import { useCallback, useEffect } from "react";
import { useMutation, useSubscription } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { CHECK_ROOM, LEAVE_ROOM } from "../../../query/publicChatQuery";

type query = {
  //type of query
  chatRoom: string;
};

let timeOutCancleToken: NodeJS.Timeout;

function Hello({ chatRoom }: query) {
  const router = useRouter();

  const [leaveRoom] = useMutation(LEAVE_ROOM, {
    variables: {
      chatRoom,
      uid: typeof window ? sessionStorage.getItem("user") : "",
    },
  });

  const { data, loading, error } = useSubscription(CHECK_ROOM, {
    variables: { chatRoom: chatRoom },
  });
  const cleanUp = useCallback(() => {
    if (timeOutCancleToken) {
      clearTimeout(timeOutCancleToken);
    }
    leaveRoom();
  }, [leaveRoom]);

  //when some user exit from the room
  useEffect(() => {
    if (data?.CheckRoom.leave) {
      timeOutCancleToken = setTimeout(() => {
        router.back();
      }, 5000);
    }
  }, [data, router]);

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
      <div className="w-1/4  flex justify-center items-center">
        <div className="w-1/2 h-1/2 bg-white text-center">
          <Image
            src="/images/profile.png"
            width={50}
            height={50}
            layout="responsive"
            alt="user profile"></Image>
          <p className="">username</p>
          <p>age</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni totam
            dolor temporibus voluptates reprehenderit, quam est, ipsum officia
            ea ab fugiat velit atque nisi debitis exercitationem doloremque,
            distinctio perferendis necessitatibus.
          </p>
        </div>
      </div>
      <div className="md:w-1/2 h-full sm:w-full bg-white  flex flex-col-reverse mx-auto mb-0 p-0 bottom-0 left-0 right-0">
        <div className="text-center h-12">
          <ChatInput chatRoom={chatRoom}></ChatInput>
        </div>
        <div className="overflow-scroll overflow-x-hidden h-full flex flex-col-reverse">
          <ChatScreen chatRoom={chatRoom}></ChatScreen>
        </div>
      </div>
      <div className="w-1/4 flex justify-center items-center">
        <div className="w-1/2 h-1/2 bg-white text-center">
          <Image
            src="/images/profile.png"
            width={50}
            height={50}
            layout="responsive"
            alt="user profile"></Image>
          <p className="">username</p>
          <p>age</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            obcaecati assumenda aspernatur aperiam sed sit sint, deserunt
            voluptate, hic aut, consequuntur quasi velit corporis voluptas
            similique. Eos hic nostrum voluptatum.
          </p>
        </div>
      </div>
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

export default Hello;

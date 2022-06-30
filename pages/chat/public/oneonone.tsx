import ChatScreen from "../../../components/publicChat/ChatScreen";
import ChatInput from "../../../components/publicChat/ChatInput";
import { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";

type query = {
  //type of query
  chatRoom: string;
};

const LEAVE_ROOM = gql`
  mutation ($chatRoom: ID!, $uid: ID) {
    LeaveRoom(chat_room: $chatRoom, uid: $uid)
  }
`;
function Hello({ chatRoom }: query) {
  const [leaveRoom, { data, loading, error }] = useMutation(LEAVE_ROOM, {
    variables: {
      chatRoom,
      uid: typeof window ? sessionStorage.getItem("user") : "",
    },
  });
  useEffect(() => {
    return () => {
      leaveRoom();
    };
  });
  onbeforeunload = () => {
    leaveRoom();
  };
  return (
    <>
      <div
        className="w-screen bg-[url('/images/chat_background.jpg')]"
        style={{ height: "90vh" }}>
        <div className="md:w-1/2 h-full sm:w-full bg-white  flex flex-col-reverse mx-auto mb-0 p-0 bottom-0 left-0 right-0">
          <div className="border text-center h-12">
            <ChatInput chatRoom={chatRoom}></ChatInput>
          </div>
          <div className="overflow-scroll overflow-x-hidden h-full flex flex-col-reverse">
            <ChatScreen chatRoom={chatRoom}></ChatScreen>
          </div>
        </div>
      </div>
    </>
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

import { gql, useMutation, useSubscription } from "@apollo/client";
import { useEffect } from "react";
import { useMyInfo } from "../../hooks/useGetMyInfo";
import { GET_OFF_CALL_MUT } from "../../query/privateChatQuery";

const GET_CALL = gql`
  subscription getCall($uid: ID!) {
    GetCall(uid: $uid) {
      from
      chatRoom
    }
  }
`;

const SubscribeCall = () => {
  const { uid, userType } = useMyInfo()();
  const { data } = useSubscription(GET_CALL, {
    variables: { uid },
  });

  const [getOffCall] = useMutation(GET_OFF_CALL_MUT);

  useEffect(() => {
    if (userType === "USER") {
      if (data) {
        const getCall = confirm(`call from ${data.GetCall?.from}`);
        // the variables decide accept or deny when have a call
        if (getCall) {
          window.open(
            `/chat/private/video/${data.GetCall.chatRoom}`,
            "mywindow", // this is important infomation for enter the video room
            "status=1,toolbar=0"
          );
        } else {
          // if call denied by user, send deny signal
          getOffCall({
            variables: {
              chatRoom: data.GetCall?.chatRoom,
            },
          });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <></>;
};

export default SubscribeCall;

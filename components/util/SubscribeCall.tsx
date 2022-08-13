// 1. hooks or react/next and ...etc built-in function
import { gql, useMutation, useSubscription } from "@apollo/client";
import { useEffect } from "react";
import { useMyInfo } from "../../hooks/useGetMyInfo";

// 2. util or hand-made function

// 3. query for graphql
import { GET_OFF_CALL_MUT } from "query/privateChatQuery";
const GET_CALL = gql`
  subscription getCall($uid: ID!) {
    GetCall(uid: $uid) {
      from
      chatRoom
    }
  }
`;

// 4. associated with component

// 5. types

const SubscribeCall = () => {
  const { userInfo, userType } = useMyInfo()();
  const { data } = useSubscription(GET_CALL, {
    variables: { uid: userInfo._id },
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

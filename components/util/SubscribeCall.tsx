import { gql, useMutation, useSubscription } from "@apollo/client";
import { useEffect } from "react";
import { useMyInfo } from "../../hooks/useGetMyInfo";

const GET_CALL = gql`
  subscription getCall($uid: ID!) {
    GetCall(uid: $uid) {
      from
      chatRoom
    }
  }
`;

const GET_OFF_CALL_MUT = gql`
  mutation getOffCall($chatRoom: ID) {
    GetOffCall(chat_room: $chatRoom)
  }
`;

const SubscribeCall = () => {
  const { uid, userType } = useMyInfo()();

  const { data, error } = useSubscription(GET_CALL, {
    variables: { uid },
  });

  const [getOffCall] = useMutation(GET_OFF_CALL_MUT);
  useEffect(() => {
    if (data) {
      const getCall = confirm(`call from ${data.GetCall?.from}`);
      if (getCall) {
      } else {
        getOffCall({
          variables: {
            chatRoom: data.GetCall?.chatRoom,
          },
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <></>;
};

export default SubscribeCall;

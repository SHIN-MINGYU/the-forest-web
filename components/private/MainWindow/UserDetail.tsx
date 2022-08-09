import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { GET_PRIVATE_ROOM_QUE } from "@query/privateChatQuery";
import { ChatDetail, UserDetail } from "@type/privateRoom";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { AiFillWechat } from "react-icons/ai";
import { IoMdVideocam } from "react-icons/io";

type props = {
  data: UserDetail;
  setData: Dispatch<SetStateAction<ChatDetail>>;
};

const SEND_CALL = gql`
  mutation SendCall($uid: ID) {
    SendCall(uid: $uid)
  }
`;

const UserDetail = ({ data: { userInfo }, setData }: props) => {
  const [getData] = useLazyQuery(GET_PRIVATE_ROOM_QUE, {
    variables: {
      uid: userInfo._id,
      type: "oneonone",
      category: "private",
    },
  });
  const [sendCall] = useMutation(SEND_CALL);
  // if 1:1 chatbutton click, occur get privateRoomId and change component to chatdetail

  const loadVideoChatPage = () => {
    console.log(userInfo._id);
    if (userInfo.status === true) {
      // 여기서 send Call을 해주니까 video chat component가 mount 되기 전에
      // event가 일어나서 유저가 그 전에 취소를 눌러버리면 cancle event가
      // 일어나지 않을 수 있음

      sendCall({
        variables: {
          uid: userInfo._id,
        },
      })
        .then((res) => {
          window.open(
            `video/${res.data?.SendCall}`,
            "mywindow",
            "status=1,toolbar=0"
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("this user is not logined");
    }
  };

  return (
    <>
      {userInfo && (
        <>
          <div className="h-4/5 flex flex-col justify-center items-center space-y-2">
            <div className="rounded-full border border-gray-400 overflow-hidden">
              <Image
                src={userInfo.imgPath}
                width={300}
                height={300}
                alt="profile"></Image>
            </div>
            <p className="text-gray-400">{userInfo.nickname}</p>
            <div>
              <p className="text-center">status</p>
              <p className="text-gray-400">{userInfo.description}</p>
            </div>
          </div>
          <div className="h-1/5 border flex justify-center items-center space-x-5">
            <div
              onClick={async () => {
                try {
                  const res = await getData();
                  setData({
                    type: "ChatDetail",
                    chatRoom: res.data.GetPrivateRoom,
                    opponentNickname: userInfo.nickname,
                  });
                } catch (err) {
                  alert("Network error");
                }
              }}
              className="flex flex-col items-center p-2 rounded-full overflow-hidden border active:bg-green-200">
              <AiFillWechat size={100}></AiFillWechat>
              <p>1:1 chat</p>
            </div>
            <div
              className="flex flex-col items-center"
              onClick={() => loadVideoChatPage()}>
              <IoMdVideocam size={100}></IoMdVideocam>
              <p>video chat</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserDetail;

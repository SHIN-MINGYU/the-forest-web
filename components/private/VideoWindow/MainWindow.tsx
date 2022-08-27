// 1. hooks or react/next and ...etc built-in function
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useMyInfo } from "hooks/useGetMyInfo";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import Peer from "peerjs";

// 2. util or hand-made function
import { connectPeer, connectToVideo } from "./helper";

// 3. query for graphql
import { GET_OFF_CALL_MUT } from "query/privateChatQuery";

// 4. associated with component
import { TiDeleteOutline } from "react-icons/ti";

// 5. types
import { UserInfo } from "types/user.type";
import { useRouter } from "next/router";

type Props = {
  chatRoom: string;
  opponentInfo?: Omit<UserInfo, "description" | "gender" | "status">;
};

const MainWindow = ({ chatRoom, opponentInfo }: Props) => {
  const myVideo = useRef<HTMLVideoElement>(null);
  const opponentVideo = useRef<HTMLVideoElement>(null);
  const [peer, setPeer] = useState<Peer | undefined>(undefined);
  const [waitForUser, setWaitForUser] = useState<boolean>(true);

  const router = useRouter();
  const {
    userInfo: { _id },
  } = useMyInfo()();
  const [getOffCall] = useMutation(GET_OFF_CALL_MUT);

  const connectVideo = async (peer: Peer) => {
    // create peer that use my objectId in database
    myVideo.current!.muted = true;
    // myVideo's audio is not required

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        connectToVideo(myVideo, stream, setWaitForUser);

        // connect To my Videoz
        peer.on("call", (call) => {
          // if the opponent enter My Room emit 'call' event
          call.answer(stream);
          // the call's answer is stream
          call.on("stream", (stream) => {
            // stream event is occured => send to opponentVideo what the stream
            connectToVideo(opponentVideo, stream, setWaitForUser, true);
          });
        });

        const call = peer.call(
          /* opponentInfo._id */ typeof router.query.uid === "string"
            ? "123"
            : "query",
          stream
        );
        call.on("stream", (stream) => {
          connectToVideo(opponentVideo, stream, setWaitForUser, true);
        });
      });
  };

  useEffect(() => {
    connectPeer(router, setPeer);
  }, [router]);

  useEffect(() => {
    if (typeof peer != "undefined") connectVideo(peer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peer]);

  return (
    <>
      <video ref={opponentVideo} className="w-full h-full bg-black"></video>
      {waitForUser && (
        <div className="absolute inset-0 flex  flex-col justify-center items-center">
          {/*           <div className="animate-bounce border-2 p-6 rounded-full max-w-40 max-h-40 flex flex-col justify-center items-center bg-blue-300">
            <Image
              src={opponentInfo.imgPath}
              width={100}
              height={100}
              alt="profile image"></Image>
            <p className="text-2xl mt-2 font-bold text-white">
              {opponentInfo.nickname}
            </p>
          </div>
          <p className="text-white">waiting user...</p> */}
        </div>
      )}
      <video ref={myVideo} className="absolute top-0 m-2w-32 h-32 z-20"></video>
      <div className="absolute bottom-0 h-20 w-full flex justify-center">
        <div className="flex justify-center items-center w-16 h-16 rounded-full bg-green-300">
          <TiDeleteOutline
            className="text-white"
            onClick={() => {
              //this button is exit room button
              getOffCall({
                variables: {
                  chatRoom,
                },
              }).then(() => {
                window.close();
              });
            }}
            size={30}></TiDeleteOutline>
        </div>
      </div>
    </>
  );
};

export default MainWindow;

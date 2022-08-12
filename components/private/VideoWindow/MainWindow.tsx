// 1. hooks or react/next and ...etc built-in function
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useMyInfo } from "hooks/useGetMyInfo";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import Peer from "peerjs";

// 2. util or hand-made function
import { PEER_ENDPOINT } from "utils/loadEnv";

// 3. query for graphql
import { GET_OFF_CALL_MUT } from "query/privateChatQuery";

// 4. associated with component
import { TiDeleteOutline } from "react-icons/ti";

// 5. types
import { UserInfo } from "types/user.type";
type Props = {
  chatRoom: string;
  opponentInfo: Omit<UserInfo, "description" | "gender" | "status">;
};

const MainWindow = ({ chatRoom, opponentInfo }: Props) => {
  const myVideo = useRef<HTMLVideoElement>(null);
  const opponentVideo = useRef<HTMLVideoElement>(null);
  const [peer, setPeer] = useState<Peer | undefined>(undefined);
  const [waitForUser, setWaitForUser] = useState<boolean>(true);

  const {
    userInfo: { _id },
  } = useMyInfo()();
  const [getOffCall] = useMutation(GET_OFF_CALL_MUT);

  const connectToVideo = (
    ref: RefObject<HTMLVideoElement>,
    stream: MediaStream
  ) => {
    // connect to current stream on current video
    if (ref === opponentVideo) {
      setWaitForUser(false);
    }
    ref.current!.srcObject = stream;
    ref.current!.onloadedmetadata = () => {
      ref.current!.play();
    };
  };

  const connectPeer = useCallback(async () => {
    const { default: Peer } = await import("peerjs");
    const peer = new Peer(_id, {
      // peer server's option
      host:
        process.env.NODE_ENV === "production"
          ? new URL(PEER_ENDPOINT!).pathname
          : "localhost",
      port: process.env.NODE_ENV === "production" ? 433 : 9000,
      path: "/forest",
      secure: process.env.NODE_ENV === "production" ? true : false,
    });
    // setState the own peer
    setPeer(peer);
  }, [_id]);

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
        connectToVideo(myVideo, stream);
        // connect To my Video
        peer.on("call", (call) => {
          // if the opponent enter My Room emit 'call' event
          call.answer(stream);
          // the call's answer is stream
          call.on("stream", (stream) => {
            // stream event is occured => send to opponentVideo what the stream
            connectToVideo(opponentVideo, stream);
          });
        });

        const call = peer.call(opponentInfo._id, stream);
        call.on("stream", (stream) => {
          connectToVideo(opponentVideo, stream);
        });
      });
  };

  useEffect(() => {
    connectPeer();
  }, [connectPeer]);

  useEffect(() => {
    if (typeof peer != "undefined") connectVideo(peer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peer]);

  return (
    <>
      <video ref={opponentVideo} className="w-full h-full bg-black"></video>
      {waitForUser && (
        <div className="absolute inset-0 flex  flex-col justify-center items-center">
          <div className="animate-bounce border-2 p-6 rounded-full max-w-40 max-h-40 flex flex-col justify-center items-center bg-blue-300">
            <Image
              src={opponentInfo.imgPath}
              width={100}
              height={100}
              alt="profile image"></Image>
            <p className="text-2xl mt-2 font-bold text-white">
              {opponentInfo.nickname}
            </p>
          </div>
          <p className="text-white">waiting user...</p>
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

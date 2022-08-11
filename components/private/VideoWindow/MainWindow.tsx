import { useRouter } from "next/router";
import { RefObject, useEffect, useRef } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { useMyInfo } from "hooks/useGetMyInfo";
import { GET_OFF_CALL_MUT } from "query/privateChatQuery";
import { useMutation } from "@apollo/client";
import { API_ENDPOINT } from "utils/loadEnv";

type props = {
  chatRoom: string;
  uid: string;
};

const MainWindow = ({ chatRoom, uid }: props) => {
  const myVideo = useRef<HTMLVideoElement>(null);
  const opponentVideo = useRef<HTMLVideoElement>(null);

  const { uid: myId } = useMyInfo()();
  const [getOffCall] = useMutation(GET_OFF_CALL_MUT);

  const connectToVideo = (
    ref: RefObject<HTMLVideoElement>,
    stream: MediaStream
  ) => {
    // connect to current stream on current video
    ref.current!.srcObject = stream;
    ref.current!.onloadedmetadata = () => {
      ref.current!.play();
    };
  };

  const connetVideo = async () => {
    const { default: Peer } = await import("peerjs");
    const peer = new Peer(myId, {
      host:
        process.env.NODE_ENV === "production"
          ? new URL(API_ENDPOINT!).pathname
          : "localhost",
      port: 9000,
      path: "/peer",
    });
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

        const call = peer.call(uid, stream);
        call.on("stream", (stream) => {
          connectToVideo(opponentVideo, stream);
        });
      });
  };

  useEffect(() => {
    connetVideo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <video ref={myVideo} className="w-full h-full"></video>
      <video
        ref={opponentVideo}
        className="absolute top-0 m-2w-32 h-32 z-20"></video>
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
              });
              window.close();
            }}
            size={30}></TiDeleteOutline>
        </div>
      </div>
    </>
  );
};

export default MainWindow;

import { useSubscription } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { GET_OFF_CALL_SUB } from "@query/privateChatQuery";

const Video = () => {
  const [auth, setAuth] = useState<boolean>(false);
  const router = useRouter();
  const { data, loading, error } = useSubscription(GET_OFF_CALL_SUB, {
    variables: {
      chatRoom: router.query.room,
    },
    fetchPolicy: "network-only",
  });

  console.log(data, loading, error);
  const myVideo = useRef<HTMLVideoElement>(null);
  if (typeof window != "undefined") {
    console.log(window);
    console.log(navigator);
  }
  useEffect(() => {
    if (typeof window != "undefined") {
      if (window.frames.name == "mywindow") {
        if (!auth) setAuth(true);
      } else {
        location.href = "/404";
      }
    }
    if (auth) {
      import("peerjs").then(({ default: Peer }) => {
        const peer = new Peer("secret", {
          host: "/",
          port: 3001,
        });

        peer.on("open", (id) => {
          console.log("join-room", id);
        });
      });
      myVideo.current!.muted = true;
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then((stream) => {
          myVideo.current!.srcObject = stream;
          myVideo.current!.onloadedmetadata = () => {
            myVideo.current!.play();
          };
        });
    }
  }, [auth]);

  if (!auth) {
    return <div className="h-screen w-screen bg-black "></div>;
  } else {
    return (
      <div className="relative">
        <video ref={myVideo} className="w-full h-full"></video>
        <div className="absolute top-0 m-2 bg-black w-32 h-32 z-20"></div>
        <div className="absolute bottom-0 h-20 w-full flex justify-center">
          <div className="flex justify-center items-center w-16 h-16 rounded-full bg-green-300">
            <TiDeleteOutline className="text-white" size={30}></TiDeleteOutline>
          </div>
        </div>
      </div>
    );
  }
};

export default Video;

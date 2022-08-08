import { useRouter } from "next/router";
import Peer from "peerjs";
import { useEffect, useRef, useState } from "react";

const Video = () => {
  const router = useRouter();
  const [peer, setPeer] = useState<Peer>();
  const myVideo = useRef<HTMLVideoElement>(null);

  useEffect(() => {
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
  }, []);

  console.log();
  return (
    <div>
      <video ref={myVideo} className="w-screen h-screen"></video>
    </div>
  );
};

export default Video;

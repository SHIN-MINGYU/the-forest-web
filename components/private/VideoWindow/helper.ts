import { NextRouter } from "next/router";
import Peer from "peerjs";
import { Dispatch, RefObject, SetStateAction } from "react";
import { PEER_ENDPOINT } from "../../../utils/loadEnv";

export const connectPeer = async (
  router: NextRouter,
  setPeer: Dispatch<SetStateAction<Peer | undefined>>
) => {
  const { default: Peer } = await import("peerjs");
  const peer = new Peer(
    /* _id */ typeof router.query.uid === "string" ? router.query.uid : "123",
    {
      // peer server's option
      host:
        process.env.NODE_ENV === "production"
          ? new URL(PEER_ENDPOINT!).pathname
          : "localhost",
      port: process.env.NODE_ENV === "production" ? 433 : 9000,
      path: "/forest",
      secure: process.env.NODE_ENV === "production" ? true : false,
    }
  );
  // setState the own peer
  setPeer(peer);
};

export const connectToVideo = (
  ref: RefObject<HTMLVideoElement>,
  stream: MediaStream,
  setWaitForUser: Dispatch<SetStateAction<boolean>>,
  condition?: boolean
) => {
  // connect to current stream on current video
  if (condition) {
    setWaitForUser(false);
  }

  ref.current!.srcObject = stream;
  ref.current!.onloadedmetadata = () => {
    ref.current!.play();
  };
};

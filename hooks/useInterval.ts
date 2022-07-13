import { useEffect, useRef } from "react";

type UseInterval = (callback: () => unknown, delay: number | null) => void;

const useInterval: UseInterval = (
  callback: () => unknown,
  delay: number | null
) => {
  const savedCallback = useRef(callback);
  // Even if the value changes, the rendering will not occur because of useRef
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    //clean Up
    if (delay == null) {
      return;
    }
    const timeId = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(timeId);
  }, [delay]);
};

export default useInterval;

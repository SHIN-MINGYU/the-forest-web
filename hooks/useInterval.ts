// 1. hooks or react/next and ...etc built-in function
import { useEffect, useRef } from "react";

// 2. util or hand-made function

// 3. query for graphql

// 4. associated with component

// 5. types
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

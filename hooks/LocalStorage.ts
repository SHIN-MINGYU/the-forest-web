export const getLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    //if window is undefined, our application cant find localStorage
    return localStorage.getItem(key);
  }
  return null;
};

export const setLocalStorage = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

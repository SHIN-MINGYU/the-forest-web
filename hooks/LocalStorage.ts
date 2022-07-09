export const getLocalStorage = (key: string): string => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem(key);
    //if window is undefined, our application cant find localStorage
    if (value !== null) {
      return value;
    }
  }
  return "";
};

export const setLocalStorage = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

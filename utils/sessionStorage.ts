export const getSessionStorage = (key: string) => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem(key)!;
  }
  return "";
};

export const setSessionStorage = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, value);
  }
};

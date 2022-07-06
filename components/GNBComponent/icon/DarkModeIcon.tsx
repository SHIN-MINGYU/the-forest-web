import { BsEmojiSunglasses } from "react-icons/bs";
import { setLocalStorage } from "@hooks/LocalStorage";
import { useEffect } from "react";

const DarkModeIcon = ({ setTheme }: any) => {
  useEffect(() => {
    return () => {
      document.documentElement.classList.toggle("dark");
    };
  }, []);
  //DarkModeIcon component
  return (
    <BsEmojiSunglasses
      color="white"
      style={{ cursor: "pointer" }}
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => {
        setLocalStorage("theme", "light");
        setTheme("light");
      }}
    />
  );
};
export default DarkModeIcon;

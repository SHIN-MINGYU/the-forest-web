import { BsEmojiSunglasses } from "react-icons/bs";
import { setLocalStorage } from "utils/localStorage";
import { useEffect } from "react";

const DarkModeIcon = ({ setTheme }: any) => {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);
  //DarkModeIcon component
  return (
    <BsEmojiSunglasses
      color="white"
      style={{ cursor: "pointer" }}
      onMouseDown={(e) => e.preventDefault()}
      //for prevent click with another
      onClick={() => {
        setLocalStorage("theme", "light");
        setTheme("light");
      }}
    />
  );
};
export default DarkModeIcon;

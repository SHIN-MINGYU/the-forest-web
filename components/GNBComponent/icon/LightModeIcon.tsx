import { BsEmojiSunglassesFill } from "react-icons/bs";
import { setLocalStorage } from "utils/localStorage";
import { useEffect } from "react";

const LightModeIcon = ({ setTheme }: any) => {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);
  //LightModeIcon component
  return (
    <BsEmojiSunglassesFill
      style={{ cursor: "pointer" }}
      onMouseDown={(e) => e.preventDefault()}
      //for prevent click with another
      onClick={() => {
        setLocalStorage("theme", "dark");
        setTheme("dark");
      }}
    />
  );
};

export default LightModeIcon;

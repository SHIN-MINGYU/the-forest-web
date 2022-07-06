import { BsEmojiSunglassesFill } from "react-icons/bs";
import { setLocalStorage } from "@hooks/LocalStorage";
import { useEffect } from "react";

const LightModeIcon = ({ setTheme }: any) => {
  useEffect(() => {
    return () => {
      document.documentElement.classList.toggle("dark");
    };
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

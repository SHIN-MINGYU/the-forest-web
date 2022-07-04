import { BsEmojiSunglassesFill } from "react-icons/bs";
import { setLocalStorage } from "@hooks/LocalStorage";

const LightModeIcon = ({ setTheme }: any) => {
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

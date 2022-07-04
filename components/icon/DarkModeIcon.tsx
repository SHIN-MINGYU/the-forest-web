import { BsEmojiSunglasses } from "react-icons/bs";
import { setLocalStorage } from "@hooks/LocalStorage";

const DarkModeIcon = ({ setTheme }: any) => {
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

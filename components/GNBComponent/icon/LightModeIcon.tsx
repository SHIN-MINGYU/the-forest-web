// 1. hooks or react/next and ...etc built-in function
import { Dispatch, SetStateAction, useEffect } from "react";

// 2. util or hand-made function
import { setLocalStorage } from "utils/localStorage";

// 3. query for graphql

// 4. associated with component
import { BsEmojiSunglassesFill } from "react-icons/bs";

// 5. types
type Props = {
  setTheme: Dispatch<SetStateAction<string>>;
};

const LightModeIcon = ({ setTheme }: Props) => {
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

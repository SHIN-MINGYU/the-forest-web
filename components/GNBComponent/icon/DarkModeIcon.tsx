// 1. hooks or react/next and ...etc built-in function
import { Dispatch, SetStateAction, useEffect } from "react";

// 2. util or hand-made function
import { setLocalStorage } from "utils/localStorage";

// 3. query for graphql

// 4. associated with component
import { BsEmojiSunglasses } from "react-icons/bs";

// 5. types
type Props = {
  setTheme: Dispatch<SetStateAction<string>>;
};

const DarkModeIcon = ({ setTheme }: Props) => {
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

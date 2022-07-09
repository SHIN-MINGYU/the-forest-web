import { useEffect, useState } from "react";
import { getLocalStorage } from "@hooks/LocalStorage";
import DarkModeIcon from "./DarkModeIcon";
import LightModeIcon from "./LightModeIcon";

const ThemeIcon = () => {
  const [theme, setTheme] = useState(getLocalStorage("theme"));
  const [icon, setIcon] = useState<JSX.Element>(<></>);
  useEffect(() => {
    if (theme) {
      if (theme === "dark") {
        setIcon(<DarkModeIcon setTheme={setTheme}></DarkModeIcon>);
        //if our website's body tag has dark class, this do delete that
        //if it is not exist, add class what is dark
      } else {
        setIcon(<LightModeIcon setTheme={setTheme}></LightModeIcon>);
      }
    }
  }, [theme]);

  return icon;
};

export default ThemeIcon;

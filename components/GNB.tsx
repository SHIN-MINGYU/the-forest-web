import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsEmojiSunglassesFill, BsEmojiSunglasses } from "react-icons/bs";
import { getLocalStorage, setLocalStorage } from "../hooks/LocalStorage";

const LightModeIcon = ({ setTheme }: any) => {
  return (
    <BsEmojiSunglassesFill
      style={{ cursor: "pointer" }}
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => {
        setLocalStorage("theme", "dark");
        setTheme("dark");
      }}
    />
  );
};
const DarkModeIcon = ({ setTheme }: any) => {
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

const ThemeIcon = () => {
  const [theme, setTheme] = useState(getLocalStorage("theme"));
  const [icon, setIcon] = useState<JSX.Element>(<></>);
  useEffect(() => {
    if (theme === "dark") {
      setIcon(<DarkModeIcon setTheme={setTheme}></DarkModeIcon>);
      document.documentElement.classList.toggle("dark");
    } else {
      setIcon(<LightModeIcon setTheme={setTheme}></LightModeIcon>);
      document.documentElement.classList.toggle("dark");
    }
  }, [theme]);
  return icon;
};

function GNB() {
  return (
    <div className="flex justify-around top-0 z-50 bg-white min-w-full p-3 dark:bg-black ">
      <Link href="/">
        <div className="flex items-center" style={{ cursor: "pointer" }}>
          <Image
            src="/favicon.ico"
            width={50}
            height={50}
            alt="favicon"></Image>
          <span className="ml-2 text-2xl text-green-700 font-bold">
            The Forest
          </span>
          <span className="mt-3 ml-2 text-xs text-green-700 font-bold">
            with a stranger
          </span>
        </div>
      </Link>
      <div className="flex items-center">
        <ul className="text-black dark:text-white">
          <li className="float-left mr-4">
            <Link href="/about"> About</Link>
          </li>
          <li className="float-left mr-4">Policy</li>
          <li className="float-left mr-20 ">Contact</li>
          <li className="float-left mr-4 mt-1">
            <p>
              <ThemeIcon></ThemeIcon>
            </p>
          </li>
          <li className="float-left mr-4">Welcom Stranger!</li>
        </ul>
      </div>
    </div>
  );
}

export default GNB;

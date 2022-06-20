import Link from "next/link";
import React, { HTMLAttributes, useEffect, useState } from "react";
import { IconType } from "react-icons";
import { BsEmojiSunglassesFill, BsEmojiSunglasses } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { light, dark } from "../redux/actions/theme";

function GNB() {
  const dispatch = useDispatch();
  const [darkModeIcon, setDarkModeIcon] = useState(<></>);
  useEffect(() => {
    {
      localStorage.theme === "light"
        ? setDarkModeIcon(
            <BsEmojiSunglassesFill
              style={{ cursor: "pointer" }}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                if (localStorage.theme === "light") {
                  localStorage.theme = "dark";
                  dispatch(dark());
                } else {
                  localStorage.theme = "light";
                  dispatch(light());
                }
              }}
            />
          )
        : setDarkModeIcon(
            <BsEmojiSunglasses
              color="white"
              style={{ cursor: "pointer" }}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                if (localStorage.theme === "light") {
                  localStorage.theme = "dark";
                  dispatch(dark());
                } else {
                  localStorage.theme = "light";
                  dispatch(light());
                }
              }}
            />
          );
    }
  }, []);
  return (
    <div className="flex justify-around top-0 z-50 bg-white min-w-full p-3 dark:bg-black ">
      <Link href="/">
        <div className="flex items-center" style={{ cursor: "pointer" }}>
          <img src="favicon.ico" width={50}></img>
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
            <p children={darkModeIcon}></p>
          </li>
          <li className="float-left mr-4">Welcom Stranger!</li>
        </ul>
      </div>
    </div>
  );
}

export default GNB;

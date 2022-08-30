import { Dispatch, SetStateAction } from "react";
import { setLocalStorage } from "../../../../../utils/localStorage";

type Props = {
  who: string;
  setState: Dispatch<SetStateAction<string>>;
};

const colors = [
  "red",
  "pink",
  "purple",
  "fuchsia",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "green",
  "emerald",
  "lime",
  "yellow",
  "amber",
  "orange",
  "gray",
];

const Pallete = ({ who, setState }: Props) => {
  const changeColor = (color: string) => {
    setLocalStorage(who, color);
    setState(color);
  };

  const renderItem = () => {
    return colors.map((key, index) => {
      const colorSet = [
        <div className="text-center break-all" key={"title" + String(index)}>
          <span>{key}</span>
        </div>,
      ];

      for (let i = 100; i < 1000; i += 100) {
        const color = "bg-" + key + "-" + String(i);
        colorSet.push(
          <div
            onClick={() => changeColor(key + "-" + String(i))}
            className={`w-6 h-6 m-auto ${color}`}></div>
        );
      }
      return colorSet;
    });
  };

  return (
    <div className="flex-row flex-wrap space-x-6 grid grid-cols-5">
      {colors.map((el, index) => {
        return <div key={index}>{renderItem()[index]}</div>;
      })}
    </div>
  );
};

export default Pallete;

/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";

type Props = {
  title: string;
  children: JSX.Element | JSX.Element[];
  imgSrc: string;
  position?: string;
};

const Article = ({ title, children, imgSrc, position }: Props) => {
  return (
    <>
      <div
        id="subtitle"
        className={"flex mt-2 " + `${position === "end" ? "justify-end" : ""}`}>
        <p className="text-lg mx-2 font-bold">{title}</p>
      </div>
      <div
        id="content"
        className={
          "flex mt-2 " + `${position === "end" ? "flex-row-reverse" : ""}`
        }>
        <div className="flex flex-col p-2 shadow-lg">
          <Image src={imgSrc} width={200} height={200} alt="forest"></Image>
        </div>
        <div className={"flex flex-1 flex-col py-2 px-4 justify-around"}>
          {children}
        </div>
      </div>
    </>
  );
};
export default Article;

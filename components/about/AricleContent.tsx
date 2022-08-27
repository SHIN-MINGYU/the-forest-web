import { useEffect, useState } from "react";

type Props = {
  children: string;
  keyword?: string;
  position?: string;
  keywordColor?: string;
};

const ArticleContent = ({
  children,
  keyword,
  position,
  keywordColor,
}: Props) => {
  const [content, setContent] = useState<string[]>([]);

  useEffect(() => {
    setContent(() => children.split("."));
  }, [children]);

  return (
    <>
      {content.map((line, index) => {
        if (!line) return;
        return (
          <p
            className={`${position === "end" ? "text-right" : "text-left"}`}
            key={index}>
            {line.split(" ").map((word, index) => {
              if (word === keyword) {
                return (
                  <span key={index}>
                    <span className={`bg-${keywordColor}-200`}>{word}</span>
                    <span> </span>
                  </span>
                );
              } else {
                return word + " ";
              }
            })}
            .
          </p>
        );
      })}
    </>
  );
};

export default ArticleContent;

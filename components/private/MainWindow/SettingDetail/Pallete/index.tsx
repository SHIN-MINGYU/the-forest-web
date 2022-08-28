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
  "brown",
  "gray",
];

const Pallete = () => {
  const renderItem = () => {
    return colors.map((key, index) => {
      const colorSet = [
        <div key={"title" + String(index)}>
          <span>{key}</span>
        </div>,
      ];

      for (let i = 100; i < 1000; i += 100) {
        const color = "bg-" + key + "-" + String(i);
        colorSet.push(<div className={`w-6 h-6 m-auto ${color}`}></div>);
      }
      return colorSet;
    });
  };

  return (
    <div className="flex flex-row flex-wrap space-x-3">
      {colors.map((el, index) => {
        return <div key={index}>{renderItem()[index]}</div>;
      })}
    </div>
  );
};

export default Pallete;

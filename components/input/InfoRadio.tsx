import { BsGenderTrans } from "react-icons/bs";
import { CustomInputElementAddReset } from "../../hooks/useInput";

type Props = {
  items: string[];
  stateHandler: CustomInputElementAddReset<string>;
};

const InfoRadio = ({ items, stateHandler }: Props) => {
  return (
    <div>
      <label
        htmlFor="radioBox"
        className="flex space-x-2 mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
        <BsGenderTrans size={20} />
        <span>introduce</span>
      </label>
      <div id="radioBox" className="flex space-x-2 ml-2">
        {items.map((el, index) => {
          return (
            <div key={index}>
              <input
                className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio"
                id="flexRadio1"
                onChange={stateHandler.onChange}
                value={el}
                checked={el === stateHandler.value}
              />
              <label
                className="inline-block text-gray-800"
                htmlFor="flexRadio1">
                {el}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InfoRadio;

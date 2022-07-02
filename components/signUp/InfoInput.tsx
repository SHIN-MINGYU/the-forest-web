import { IconType } from "react-icons";
import { CustomInputElement } from "@hooks/useInput";
type props = {
  Icon: IconType;
  stateHandler: CustomInputElement<string>;
  label: string;
  required: boolean;
  waringMassage?: string;
};

function InfoInput({
  Icon,
  stateHandler,
  label,
  required,
  waringMassage,
}: props) {
  return (
    <div className="relative">
      <div className="flex justify-center items-center">
        <Icon size={20}></Icon>
        <input
          {...stateHandler}
          type={"text"}
          className="peer h-10
                pl-2
            w-full bg-transparent border-b-2 border-black
            placeholder-transparent
            text-sm
            focus:ring-0
            focus:outline-none focus:border-green-400"
          placeholder={`${label}`}></input>
        <label
          className="absolute
              left-8 top-3 transition-all
             text-gray-600 text-sm
             transform -translate-y-4
             scale-75 z-10 origin-[0]
             peer-focus:text-green-400
             peer-placeholder-shown:scale-100
             peer-placeholder-shown:translate-y-0
             peer-focus:scale-75
             peer-focus:-translate-y-4
             ">
          {label}
        </label>
      </div>
      {required ? (
        <label className="absolute right-0 top-3 text-red-600">*</label>
      ) : (
        <></>
      )}
      <p
        className="
              text-xs tracking-wider font-sans font-bold
              text-red-500">
        {waringMassage};
      </p>
    </div>
  );
}

export default InfoInput;

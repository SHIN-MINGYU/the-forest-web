import { IconType } from "react-icons";
import { CustomInputElementAddReset } from "@hooks/useInput";
import { KeyboardEvent, useEffect, useRef } from "react";
type props = {
  Icon: IconType;
  stateHandler: CustomInputElementAddReset<string>;
  label: string;
  required?: boolean;
  waringMassage?: string;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
};
function InfoInput({
  Icon,
  stateHandler,
  label,
  required,
  waringMassage,
  onKeyDown,
}: props) {
  const { reset, ...state } = stateHandler;
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="relative">
      <div className="flex justify-center items-center">
        <Icon size={20} />
        <input
          {...state}
          type={"text"}
          ref={inputRef}
          className="peer p-0
                pl-2
            w-full bg-transparent border-b-2 border-black
            placeholder-transparent
            text-sm
            focus:ring-0
            focus:outline-none focus:border-green-400"
          placeholder={`${label}`}
          required={required}
          onKeyDown={onKeyDown ? onKeyDown : () => {}}></input>
        <label
          onClick={(e) => {
            e.preventDefault();
            if (inputRef) inputRef.current?.focus();
          }}
          className="absolute
              left-8 top-0 transition-all
             text-gray-400 text-sm
             transform -translate-y-4
             cursor-text
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
        {waringMassage}
      </p>
    </div>
  );
}

export default InfoInput;

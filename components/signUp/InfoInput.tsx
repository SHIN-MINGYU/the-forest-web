import { IconType } from "react-icons";
import { CustomInputElementAddReset } from "@hooks/useInput";
import React, {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "@components/icon";

type props = {
  Icon: IconType;
  stateHandler: CustomInputElementAddReset<string>;
  label: string;
  type?: string;
  required?: boolean;
  validator?: (setState: Dispatch<SetStateAction<boolean>>) => void;
  validatorMsg?: string;
  button?: JSX.Element;
  buttonMsg?: String;
  waringMassage?: string;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
};

function InfoInput(props: props) {
  /* 
  params
  Icon : display to front of input tag
  stateHandler : useInput's return values
  label : label tag's text
  type : input tag's type
  validator : if essiontial value in the component, check value
  validator : validator's msg
  button : for some query or mutation
  buttonMsg : button request's response
  required : just display '*' text
  warningMassage : notice to client
  onKeyDown : response to 'enter' key
  */
  const {
    Icon,
    stateHandler,
    label,
    type,
    validator,
    validatorMsg,
    button,
    buttonMsg,
    required,
    waringMassage,
    onKeyDown,
  } = props;
  const { reset, ...state } = stateHandler;
  const [validation, setValidation] = useState(true);
  const [visible, setVisible] = useState(false);
  // a value  that changes by validator
  const inputRef = useRef<HTMLInputElement>(null);

  const passwordVisibleHandler = (e: React.MouseEvent<SVGAElement>) => {
    e.preventDefault();
    setVisible(!visible);
  };

  return (
    <div className="relative">
      <div className="flex justify-center items-center">
        {required && <label className="text-red-600">*</label>}
        <Icon size={20} />
        <input
          {...state}
          /* 
          {...state}=>
          value = state.value
          onChange = state.onChange
          */
          type={type ? (visible ? "text" : "password") : "text"}
          ref={inputRef}
          onBlur={validator ? () => validator(setValidation) : () => {}}
          className={`peer p-0
                pl-2
            w-full bg-transparent border-b-2 ${
              validation ? "border-black" : "border-red-600"
            }
            placeholder-transparent
            text-sm
            focus:ring-0
            focus:outline-none ${
              validation ? "focus:border-green-400" : "focus:border-red-600"
            }`}
          placeholder={`${label}`}
          required={required}
          onKeyDown={onKeyDown && onKeyDown}></input>
        <label
          onClick={(e) => {
            e.preventDefault();
            if (inputRef) inputRef.current?.focus();
            /* if label tag is clicked, input tag reponse focus */
          }}
          className={`absolute
              left-8 top-0 transition-all
             ${validation ? "text-gray-400" : "text-red-400"} text-sm
             transform -translate-y-4
             cursor-text
             scale-75 z-10 origin-[0]
             ${
               validation
                 ? "peer-focus:text-green-400"
                 : "peer-focus:text-red-600"
             }
             peer-placeholder-shown:scale-100
             peer-placeholder-shown:translate-y-0
             peer-focus:scale-75
             peer-focus:-translate-y-4
             `}>
          {label}
        </label>
        {type === "password" &&
          // MouseDown Event => event bubbling to other text then, the other text is selected
          (visible ? (
            <AiOutlineEye
              onMouseDown={(e) => e.preventDefault()}
              onClick={passwordVisibleHandler}
              size={20}
              className="absolute cursor-pointer right-0"
            />
          ) : (
            <AiOutlineEyeInvisible
              onMouseDown={(e) => e.preventDefault()}
              onClick={passwordVisibleHandler}
              size={20}
              className="absolute cursor-pointer right-0"
            />
          ))}
        {button}
      </div>
      <div>
        {/* 
        messages group
        */}
        <p
          className="
              text-xs tracking-wider font-sans font-bold
              text-red-500">
          {waringMassage}
        </p>
        <span
          className={`
              text-xs tracking-wider font-sans font-bold
              ${
                buttonMsg?.startsWith("available") ||
                buttonMsg?.startsWith("success")
                  ? "text-blue-500"
                  : "text-red-500"
              }`}>
          {buttonMsg}
        </span>
        <p
          className="
              text-xs tracking-wider font-sans font-bold
              text-red-500">
          {validation ? "" : validatorMsg}
        </p>
      </div>
    </div>
  );
}

export default InfoInput;

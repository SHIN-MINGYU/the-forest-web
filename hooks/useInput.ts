// 1. hooks or react/next and ...etc built-in function
import React, { useCallback, useState } from "react";

// 2. util or hand-made function

// 3. query for graphql

// 4. associated with component

// 5. types

export interface CustomInputElement<T> {
  value: T;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CustomInputElementAddReset<T> extends CustomInputElement<T> {
  reset: () => void;
}

export default function useInput(
  initialValue: string
): CustomInputElementAddReset<string> {
  const [value, setValue] = useState<string>(initialValue);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const reset = useCallback(() => {
    //initailState reset function
    setValue(initialValue);
  }, [initialValue]);
  return { value, onChange, reset };
}

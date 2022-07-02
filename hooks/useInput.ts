import React, { useCallback, useState } from "react";

export interface CustomInputElement<T> {
  value: T;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface CustomInputElementHooks<T> extends CustomInputElement<T> {
  reset: () => void;
}

export default function useInput(
  initialValue: string
): CustomInputElementHooks<string> {
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

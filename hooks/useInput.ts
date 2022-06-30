import React, { useCallback, useState } from "react";

type CustomInputElement<T> = {
  value: T;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
};

export default function useInput(
  initialValue: string
): CustomInputElement<string> {
  const [value, setValue] = useState<string>(initialValue);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const reset = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);
  return { value, onChange, reset };
}

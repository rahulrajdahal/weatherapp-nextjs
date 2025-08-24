import React, { ComponentPropsWithRef, forwardRef } from "react";

interface InputProps extends ComponentPropsWithRef<"input"> {
  debounce?: number;
  value: string | number;
  onChangeValue: (value: string | number) => void;
}

export default forwardRef(function Input(
  {
    debounce = 500,
    value: initialValue,
    onChangeValue,
    ...props
  }: Readonly<InputProps>,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => setValue(initialValue), [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChangeValue(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [debounce, onChangeValue, props, value]);

  return (
    <input
      {...props}
      ref={ref}
      aria-label={`${String(value)}-input`}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
});

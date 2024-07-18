import React, { forwardRef, InputHTMLAttributes } from "react";

type PropsComponent = {
  className?: string;
  id?: string;
  type?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, PropsComponent>(({ className, id, type = "text", ...rest }, ref) => {
  return <input id={id} type={type} className={`h-6 border m-1 text-sm pl-1 ${className}`} ref={ref} {...rest} />;
});

Input.displayName = "Input";

export default Input;

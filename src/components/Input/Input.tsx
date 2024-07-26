import { forwardRef, InputHTMLAttributes } from "react";

type PropsComponent = {
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, PropsComponent>(({ className, ...rest }, ref) => {
  return <input type="text" className={`h-6 border m-1 text-sm pl-1 ${className}`} ref={ref} {...rest} />;
});

Input.displayName = "Input";

export default Input;

import React, { forwardRef, SelectHTMLAttributes } from "react";
import "./Select.css";
import { cn } from "~/utils/utils";

type PropsComponent = {
  defaultValue?: string;
  className?: string;
  children: React.ReactNode;
  size?: number;
} & SelectHTMLAttributes<HTMLSelectElement>;

const Select = forwardRef<HTMLSelectElement, PropsComponent>(({ className, defaultValue = "", children, ...rest }, ref) => {
  return (
    <select className={cn("border h-6 m-1 text-sm pl-1", className)} defaultValue={defaultValue} ref={ref} {...rest}>
      {children}
    </select>
  );
});
Select.displayName = "Select";

export default Select;

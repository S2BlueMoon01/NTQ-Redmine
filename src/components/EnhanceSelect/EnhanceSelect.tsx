import { forwardRef, ReactNode, SelectHTMLAttributes } from "react";
import "./EnhanceSelect.css";
import { cn } from "~/utils/utils";

type SelectProps = {
  defaultValue?: string | string[] | number;
  className?: string;
  arrayOption: {
    label: string;
    value: string | number;
  }[];
  children?: ReactNode;
  size?: number;
} & SelectHTMLAttributes<HTMLSelectElement>;

const EnhanceSelect = forwardRef<HTMLSelectElement, SelectProps>(({ className, defaultValue = "", arrayOption, children, ...rest }, ref) => {
  return (
    <select className={cn("border h-6 m-1 text-sm pl-1", className)} defaultValue={defaultValue} ref={ref} {...rest}>
      {arrayOption.map((item) => {
        return (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        );
      })}
      {children}
    </select>
  );
});

EnhanceSelect.displayName = "EnhanceSelect";

export default EnhanceSelect;

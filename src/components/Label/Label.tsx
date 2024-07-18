import React from "react";

type PropsComponent = {
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
};
const Label: React.FC<PropsComponent> = ({ htmlFor, className, children }) => {
  return (
    <label htmlFor={htmlFor} className={`text-xs text-gray-rain font-bold p-1.5 ${className}`}>
      {children}
    </label>
  );
};

export default Label;

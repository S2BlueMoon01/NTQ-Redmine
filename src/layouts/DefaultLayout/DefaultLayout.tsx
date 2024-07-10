import React from "react";
import Header from "../Header";

type FormItemProps = {
  children: React.ReactNode;
};

const DefaultLayout = ({ children }: FormItemProps) => {
  return (
    <div className="min-w-[800px] px-3">
      <Header />
      <div className="px-2 mt-3 bg-white min-h-[70vh] shadow-md">{children}</div>
    </div>
  );
};

export default DefaultLayout;

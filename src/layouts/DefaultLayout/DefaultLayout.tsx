import React from "react";
import Header from "../Header";

type FormItemProps = {
  children: React.ReactNode;
};

const DefaultLayout = ({ children }: FormItemProps) => {
  return (
    <>
      <Header />
      <div>DefaultLayout</div>
      <div>{children}</div>
    </>
  );
};

export default DefaultLayout;

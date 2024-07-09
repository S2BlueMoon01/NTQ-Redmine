import React from "react";

type FormItemProps = {
  children: React.ReactNode;
};

const DefaultLayout = ({ children }: FormItemProps) => {
  return (
    <>
      <div>DefaultLayout</div>
      <div>{children}</div>
    </>
  );
};

export default DefaultLayout;

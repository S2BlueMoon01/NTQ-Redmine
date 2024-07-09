import React from "react";

type FormItemProps = {
  children: React.ReactNode;
};

const DefaultLayoutPrivate = ({ children }: FormItemProps) => {
  return (
    <>
      <div>DefaultLayoutPrivate</div>
      <div>{children}</div>
    </>
  );
};

export default DefaultLayoutPrivate;

import React from "react";

type FormItemProps = {
  children: React.ReactNode;
};

const DefaultLayoutPublic = ({ children }: FormItemProps) => {
  return (
    <>
      <div>DefaultLayoutPublic</div>
      <div>{children}</div>
    </>
  );
};

export default DefaultLayoutPublic;

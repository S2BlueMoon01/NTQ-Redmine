import React from "react";
import Header from "../Header";
import Footer from "../Footer";

type FormItemProps = {
  children: React.ReactNode;
};

const DefaultLayout = ({ children }: FormItemProps) => {
  return (
    <div className="min-w-[800px] bg-gray  px-3">
      <Header />
      <div className="px-2 mt-3 pb-8 bg-white min-h-84 shadow-md">{children}</div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;

import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import { useLocation, useParams } from "react-router-dom";

type FormItemProps = {
  children: React.ReactNode;
};

const DefaultLayout = ({ children }: FormItemProps) => {
  const location = useLocation();
  const { id } = useParams();
  const isProjectPage = location.pathname.startsWith(`/projects`);
  const isDetailProjectPage = location.pathname.startsWith(`/projects/${id}`);
  const nameHeader = isDetailProjectPage ? "My project" : "NTQ Redmine";

  return (
    <div className="min-w-[1160px] px-3">
      <Header isShowNavbar={isDetailProjectPage} nameHeader={nameHeader} idProject={id} />
      <div className={`min-h-84 ${isProjectPage ? "" : "bg-white px-3 mt-3 pb-8"}`}>{children}</div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;

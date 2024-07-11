import React from "react";

const Footer = () => {
  return (
    <footer className="text-xs p-[5px] text-center	">
      Powered by{" "}
      <a className="hover:underline text-[#169]" href="https://bitnami.com/stack/redmine">
        Bitnami Redmine Stack
      </a>{" "}
      © 2006-2015 Jean-Philippe Lang
    </footer>
  );
};

export default Footer;

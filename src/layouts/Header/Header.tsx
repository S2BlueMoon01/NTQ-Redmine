import React from "react";
import { Link } from "react-router-dom";

const listMenuLeft = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "My page",
    path: "/my-page",
  },
  {
    name: "Projects",
    path: "/projects",
  },
  {
    name: "Help",
    path: "https://www.redmine.org/guide",
    isExternal: true,
  },
];

const listMenuRight = ["WorkTime", "My account", "Sign out"];

const Header = () => {
  // const isLogin = localStorage.getItem("accessToken");
  const isLogin = true;

  return (
    <header>
      <div className="flex justify-between items-center font-bold	 bg-charcoal-blue text-white h-5 text-10 ">
        {isLogin ? (
          <>
            <ul className="flex gap-3 cursor-pointer pl-1">
              {listMenuLeft.length > 0 &&
                listMenuLeft.map((item) => (
                  <Link rel={item?.isExternal ? "noopener noreferrer" : ""} className="hover:underline" key={item.name} to={item.path}>
                    {item.name}
                  </Link>
                ))}
            </ul>

            <ul className="flex cursor-pointer gap-3 pr-2">
              <li className="font-normal">
                Logged in as{" "}
                <a href="" className="hover:underline font-bold">
                  quyet.nguyen1@ntq-solution.com.vn
                </a>
              </li>
              {listMenuRight.length > 0 &&
                listMenuRight.map((item) => (
                  <li className="hover:underline" key={item}>
                    {item}
                  </li>
                ))}
            </ul>
          </>
        ) : (
          <span className="cursor-pointer hover:underline ml-auto mr-2">Sign in</span>
        )}
      </div>

      <div className=" flex justify-between min-h-21  bg-blue-gray pt-1 pr-2 pb-5 pl-2">
        <h1 className="text-2xl font-bold text-white font-sans">NTQ Redmine</h1>
        {isLogin && (
          <div className="flex gap-2 text-xs">
            <div className="flex max-h-6">
              <label className="text-white pr-2 text-sm" htmlFor="search">
                Search:
              </label>
              <input
                className=" px-1 outline-none w-full max-w-44 leading-6  text-mouse-gray"
                spellCheck={false}
                type="text"
                name="search"
                id="search"
              />
            </div>

            <select className="outline-none max-h-6 font-light leading-6  text-mouse-gray w-full max-w-44" defaultValue="">
              <option value="" disabled>
                Jump to a project...
              </option>
              <option value="redmine">Redmine</option>
              <option value="fresher">[Fresher]_ ReactJS Fresher</option>
            </select>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

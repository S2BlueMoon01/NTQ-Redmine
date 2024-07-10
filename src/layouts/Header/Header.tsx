import React from "react";

const Header = () => {
  return (
    <div>
      <div className="flex justify-between items-center font-bold	 bg-[#3E5B76] text-white h-5 text-[0.6rem] ">
        <ul className="flex gap-3 cursor-pointer pl-1 ">
          <li className="hover:underline ">Home</li>
          <li className="hover:underline">My page</li>
          <li className="hover:underline">Projects</li>
          <li className="hover:underline">Help</li>
        </ul>
        <ul className="flex cursor-pointer gap-3 pr-2">
          <li className="font-normal">
            Logged in as{" "}
            <a href="" className="hover:underline font-bold">
              quyet.nguyen1@ntq-solution.com.vn
            </a>
          </li>
          <li className="hover:underline">WorkTime</li>
          <li className="hover:underline">My account</li>
          <li className="hover:underline">Sign out</li>
        </ul>
      </div>
      <div className=" flex justify-between h-[90px]  bg-[#628DB6] pt-1 pr-2 pb-5 pl-[6px]">
        <h1 className="text-2xl font-bold text-white font-sans">NTQ Redmine</h1>
        <div className="flex gap-2 ">
          <div>
            <label className="text-white pr-2 text-sm" htmlFor="search">
              Search:
            </label>
            <input className=" px-1 outline-none w-full max-w-44" spellCheck={false} type="text" name="search" id="search" />
          </div>
          <div>
            <select className="outline-none h-6 font-light text-[14px]  w-full max-w-44" defaultValue="">
              <option value="" disabled>
                Jump to a project...
              </option>
              <option value="redmine">Redmine</option>
              <option value="fresher">[Fresher]_ ReactJS Fresher</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

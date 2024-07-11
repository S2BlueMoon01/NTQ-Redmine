import React, { useState } from "react";
import useScrollToTop from "~/hooks/useScrollToTop";
import { UserLoginInput } from "~/types/user.type";

const LoginPage = () => {
  useScrollToTop();
  const initialUserData = {
    username: "",
    password: "",
  };
  const [loginData, setLoginData] = useState<UserLoginInput>(initialUserData);
  const [isStayLogin, setIsStayLogin] = useState<boolean>(false);

  const handleInputChange = (name: string, value: string) => {
    setLoginData((t) => ({ ...t, [name]: value }));
  };

  const handleCheckStayLogin = () => {
    setIsStayLogin((t) => !t);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-center align-cent align-center ">
      <div className=" min-w-400 min-h-42 mt-15 border-2 border-solid border-[#fdbf3b] p-3 bg-light-yellow">
        <form action="" className="flex gap-x-2 mt-1.5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-2 width text-right">
            <label htmlFor="login" className="text-xs text-gray-rain font-bold p-1.5">
              Login:
            </label>
            <label htmlFor="password" className="text-xs text-gray-rain font-bold p-1.5 mt-[2px]">
              Password:
            </label>
            <a href="#!" className="text-ocean-blue text-xs p-1.5 mt-7 hover:text-[#c61a1a] hover:underline">
              Lost password
            </a>
          </div>

          <div className="flex flex-col gap-y-2">
            <input
              type="text"
              className="h-6 border m-1 min-w-[300px] text-sm pl-1"
              name="username"
              id="login"
              value={loginData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
            />
            <input
              type="password"
              className="h-6 border m-1 text-sm pl-1"
              id="password"
              value={loginData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
            <div className="flex items-center gap-x-[6px] ml-2 mt-1.5">
              <input type="checkbox" checked={isStayLogin} onChange={handleCheckStayLogin} />
              <span className="font-bold text-xs text-gray-rain">Stay logged in</span>
            </div>
            <div className="text-right ">
              <input
                type="submit"
                className="text-xs px-1.5 p-[2px] leading-5 h-5 line border bg-[#f2f2f2] text-black hover:bg-[#ccccbb]"
                value={"Login »"}
              ></input>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

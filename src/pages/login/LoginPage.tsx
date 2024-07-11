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
      <div className=" w-[440px] h-[168px] mt-[60px] border-2 border-solid border-[#fdbf3b] p-[12px] bg-[#FFEBC1]">
        <form action="" className="flex gap-x-2 mt-[5px]" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-2 width text-right">
            <label htmlFor="login" className="text-xs text-gray-rain font-bold p-[0.375rem]">
              Login:
            </label>
            <label htmlFor="password" className="text-xs text-gray-rain font-bold p-[0.375rem] mt-[2px]">
              Password:
            </label>
            <a href="#!" className="text-[#169] text-xs p-[0.375rem] mt-[28px] hover:text-[#c61a1a] hover:underline">
              Lost password
            </a>
          </div>

          <div className="flex flex-col gap-y-2">
            <input
              type="text"
              className="h-[23px] border m-[3px] w-[300px] text-[13px] pl-[3px]"
              name="username"
              id="login"
              value={loginData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
            />
            <input
              type="password"
              className="h-[23px] border m-[3px] text-[13px] pl-[3px]"
              id="password"
              value={loginData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
            <div className="flex items-center gap-x-[6px] ml-[7px] mt-[6px]">
              <input type="checkbox" checked={isStayLogin} onChange={handleCheckStayLogin} />
              <span className="font-bold text-xs text-gray-rain">Stay logged in</span>
            </div>
            <div className="text-right ">
              <input
                type="submit"
                className="text-xs px-[6px] p-[1px] leading-[19px] h-[19px] line border bg-[#f2f2f2] text-[#222] hover:bg-[#ccccbb]"
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

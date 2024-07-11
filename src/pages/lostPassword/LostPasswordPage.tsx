import React, { useState } from "react";
import ErrorImg from "~/assets/images/error-img.png";
import { Button } from "~/components/button";

const LostPasswordPage = () => {
  const [email, setEmail] = useState<string>("");
  const [isValid, setIsValid] = useState(false);
  const [unknownUser, setUnknownUser] = useState(false);

  const handleInputChange = (value: string) => {
    setEmail(value);
  };

  const handleClickValidate = () => {
    if (email.trim() === "") {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) {
      // Call api

      // If Unknown user.
      setUnknownUser(false);
    }
  };

  return (
    <>
      {unknownUser && (
        <div className="pt-2">
          <div className="flex border-[#dd0000] items-center text-[13.2px] border-2 bg-[#ffe3e3] gap-3 p-[2px] mt-2 mb-3">
            <figure className="ml-2">
              <img src={ErrorImg} alt="error" />
            </figure>
            <span className="text-[#880000]">Unknown user.</span>
          </div>
        </div>
      )}
      {isValid && (
        <div className="pt-2">
          <div className="flex border-[#dd0000] items-center text-[13.2px] border-2 bg-[#ffe3e3] gap-3 p-[2px] mt-2 mb-3">
            <figure className="ml-2">
              <img src={ErrorImg} alt="error" />
            </figure>
            <span className="text-[#880000]">Your account is locked.</span>
          </div>
        </div>
      )}
      <h2 className="text-[#555] text-xl font-bold">Lost Password</h2>
      <div className="border pl-[144px] bg-[#fcfcfc] p-3 mt-2">
        <form action="" className="flex items-center" onSubmit={handleSubmit}>
          <label htmlFor="email" className="font-bold text-xs text-[#505050]">
            Email
            <span className="text-[#bb0000] mx-1">*</span>
          </label>
          <input
            name="email"
            id="email"
            type="text"
            value={email}
            onChange={(e) => handleInputChange(e.target.value)}
            className="border w-[345px] h-[23px] text-xs pl-1"
          />
          <Button type="submit" onClick={handleClickValidate}>
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default LostPasswordPage;

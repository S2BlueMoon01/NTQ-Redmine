import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorImg from "~/assets/images/error-img.png";
import { Button } from "~/components/Button/Button";

const LostPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  const [errorMessage] = useState("");

  const onSubmit: SubmitHandler<{ email: string }> = (data) => {
    console.log(data);
    // Call API
    // If don't find email
  };

  return (
    <>
      {errorMessage && (
        <div className="pt-2">
          <div className="flex border-[#dd0000] items-center text-[13.2px] border-2 bg-[#ffe3e3] gap-3 p-[2px] mt-2 mb-3">
            <figure className="ml-2">
              <img src={ErrorImg} alt="error" />
            </figure>
            <span className="text-[#880000]">{errorMessage}</span>
          </div>
        </div>
      )}
      {errors.email && (
        <div className="pt-2">
          <div className="flex border-[#dd0000] items-center text-[13.2px] border-2 bg-[#ffe3e3] gap-3 p-[2px] mt-2 mb-3">
            <figure className="ml-2">
              <img src={ErrorImg} alt="error" />
            </figure>
            <span className="text-[#880000]">{errors.email.message}</span>
          </div>
        </div>
      )}
      <h2 className="text-[#555] text-xl font-bold">Lost Password</h2>
      <div className="border pl-[144px] bg-[#fcfcfc] p-3 mt-2">
        <form action="" className="flex items-center" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email" className="font-bold text-xs text-[#505050]">
            Email
            <span className="text-[#bb0000] mx-1">*</span>
          </label>
          <input
            id="email"
            type="text"
            className="border w-[345px] h-[23px] text-xs pl-1"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
              maxLength: {
                value: 50,
                message: "Email must be at least 50 characters long.",
              },
            })}
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </>
  );
};

export default LostPasswordPage;

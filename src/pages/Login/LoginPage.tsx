import useScrollToTop from "~/hooks/useScrollToTop";
import { UserLoginInput } from "~/types/user.type";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "~/components/Button/Button";
import { Link } from "react-router-dom";
import Input from "~/components/Input";

const LoginPage = () => {
  useScrollToTop();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginInput>();

  const submit: SubmitHandler<UserLoginInput> = () => {
    // Call API
  };

  return (
    <div className="flex justify-center align-center">
      <div className="min-w-400 min-h-42 mt-15 border-2 border-solid border-[#fdbf3b] p-3 bg-light-yellow">
        <form onSubmit={handleSubmit(submit)} className="flex gap-x-2 mt-1.5">
          <div className="flex flex-col gap-y-1 width text-right">
            <label htmlFor="login" className="text-xs text-gray-rain font-bold p-1.5">
              Login:
            </label>
            {errors.email && <p className="h-4"></p>}
            <label htmlFor="password" className="text-xs text-gray-rain font-bold p-1.5 mt-[2px]">
              Password:
            </label>
            <Link
              to={"/lost-password"}
              rel="noopener noreferrer"
              className="text-ocean-blue text-xs p-[0.375rem] mt-7 hover:text-[#c61a1a] hover:underline whitespace-nowrap"
            >
              Lost password
            </Link>
          </div>

          <div className="flex flex-col">
            <Input
              className="min-w-[300px]"
              id="login"
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
            {errors.email && <p className="text-xs text-[red] pl-2">{errors.email.message}</p>}
            <Input
              type="password"
              className="h-6 border m-1 text-sm pl-1"
              id="password"
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long.",
                },
                maxLength: {
                  value: 50,
                  message: "Password cannot exceed 50 characters in length.",
                },
              })}
            />
            {errors.password && <p className="text-xs text-[red] pl-2">{errors.password.message}</p>}
            <div className="flex items-center gap-x-[6px] ml-2 mt-1.5">
              <Input className="m-0" type="checkbox" {...register("isStayLogin")} />
              <span className="font-bold text-xs text-gray-rain">Stay logged in</span>
            </div>
            <div className="text-right">
              <Button type="submit" className="text-xs px-1.5 mr-1 leading-5 h-5 line border bg-[#f2f2f2] text-black">
                Login »
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

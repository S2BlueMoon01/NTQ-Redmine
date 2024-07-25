import moment from "moment";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorImg from "~/assets/images/error-img.png";
import Button from "~/components/Button";
import Input from "~/components/Input";
import Label from "~/components/Label";
import Select from "~/components/Select";

interface IFormInput {
  project: string;
  issue: string;
  date: string;
  hours: number;
  comment?: string;
  activity: string;
  productCategory: string;
}

const optionsProject = [
  { id: 1, nameProject: "project 1" },
  { id: 2, nameProject: "project 2" },
  { id: 3, nameProject: "project 3" },
];
const SpentTime = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const currentDate = moment().format("YYYY-MM-DD");

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data, errors?.hours?.message);

  return (
    <div className="p-2.5 mb-3 flex flex-col gap-3">
      <h2 className="text-xl font-semibold text-mouse-gray">SpentTime</h2>

      {errors?.project || errors?.issue || errors?.date || errors?.hours || errors.activity || errors?.productCategory ? (
        <div className="flex items-center text-xs text-red-900 p-5 bg-red-100 border-2 border-red-500">
          <img className="flex w-fit h-fit" src={ErrorImg} alt="Error" />
          <div className="pl-5">
            {errors.project?.message ? <li>{errors.project?.message}</li> : ""}
            {errors.issue?.message ? <li> {errors.issue?.message}</li> : ""}
            {errors.date?.message ? <li> {errors.date?.message}</li> : ""}
            {errors.hours?.message ? <li> {errors.hours?.message} </li> : ""}
            {errors.activity?.message ? <li>{errors.activity?.message} </li> : ""}
            {errors.productCategory?.message ? <li>{errors.productCategory?.message}</li> : ""}
          </div>
        </div>
      ) : (
        " "
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex mb-1 border-solid border-inherit	 border p-3">
          <div className="flex flex-col gap-2 m-1 text-right">
            <Label htmlFor="project">Project</Label>
            <Label htmlFor="issue">Issue</Label>
            <Label htmlFor="date">
              Date
              <span className="text-red-500"> *</span>
            </Label>
            <Label htmlFor="hours">
              Hours
              <span className="text-red-500"> *</span>
            </Label>
            <Label htmlFor="comment">Comment</Label>
            <Label htmlFor="activity">
              Activity
              <span className="text-red-500"> *</span>
            </Label>
            <Label htmlFor="category">
              Product Category
              <span className="text-red-500"> *</span>
            </Label>
          </div>

          <div className="flex flex-col gap-1 m-1 text-sm text-mouse-gray pl-1">
            <Select id="project" {...register("project", { required: "Project can't be blank" })}>
              <option value="" disabled></option>
              {optionsProject.map((option) => (
                <option key={option.id} value={option.nameProject}>
                  {option.nameProject}
                </option>
              ))}
            </Select>
            <Input id="issue" {...register("issue")} />

            <Input type="date" id="date" value={currentDate} min="2018-01-01" {...register("date")} />
            <Input id="hours" {...register("hours", { required: "Hours can't be blank" })} />
            <Input id="comment" {...register("comment")} />
            <Select id="activity" {...register("activity", { required: "Activity  can't be blank" })}>
              <option value="" disabled>
                ---Please select---
              </option>
              {optionsProject.map((option) => (
                <option key={option.id} value={option.nameProject}>
                  {option.nameProject}
                </option>
              ))}
            </Select>
            <Select id="category" {...register("productCategory", { required: "Product Category can't be blank" })}>
              <option value="" disabled>
                ---Please select---
              </option>
              {optionsProject.map((option) => (
                <option key={option.id} value={option.nameProject}>
                  {option.nameProject}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <Button type="submit" className="text-xs px-1.5 mr-1 leading-5 h-5 line border bg-[#f2f2f2] text-black">
          Create
        </Button>
        <Button type="submit" className="text-xs px-1.5 mr-1 leading-5 h-5 line border bg-[#f2f2f2] text-black">
          Create and continue
        </Button>
      </form>
    </div>
  );
};

export default SpentTime;

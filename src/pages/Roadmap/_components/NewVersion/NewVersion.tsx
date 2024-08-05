import moment from "moment";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorImg from "~/assets/images/error-img.png";
import Button from "~/components/Button";
import Input from "~/components/Input";
import Label from "~/components/Label";
import Select from "~/components/Select";

interface IFormInput {
  name: string;
  description?: string;
  date?: string;
  status?: number;
  wiki?: string;
  sharing: string;
}

const OPTIONS_STATUS = [
  { value: "open", label: "Open" },
  { value: "locked", label: "Locked" },
  { value: "closed", label: "Closed" },
];

const OPTIONS_SHARING = [
  { value: "notShared", label: "Not Shared" },
  { value: "sub", label: "With sub projects" },
  { value: "hierarchy", label: "With project hierarchy" },
  { value: "tree", label: "With project tree" },
];

const NewVersion = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const currentDate = moment().format("YYYY-MM-DD");

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data, errors?.name?.message);

  return (
    <div className="min-h-84 bg-white px-3 mt-3 pb-8 p-2.5 mb-3 flex flex-col gap-3">
      <h2 className="text-xl font-semibold text-mouse-gray">NewVersion</h2>

      {errors?.name ? (
        <div className="flex items-center text-xs text-red-900 p-5 bg-red-100 border-2 border-red-500">
          <img className="flex w-fit h-fit" src={ErrorImg} alt="Error" />
          <div className="pl-5">{errors.name?.message ? <li>{errors.name?.message}</li> : ""}</div>
        </div>
      ) : (
        " "
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex mb-1 border-solid border-inherit	 border p-3">
          <div className="flex flex-col gap-2 m-1 text-right">
            <Label htmlFor="name">
              Name
              <span className="text-red-500"> *</span>
            </Label>
            <Label htmlFor="description">Description</Label>
            <Label htmlFor="status">Status</Label>
            <Label htmlFor="wiki">Wiki page</Label>
            <Label htmlFor="comment">Date</Label>
            <Label htmlFor="sharing">Sharing</Label>
          </div>

          <div className="flex flex-col gap-1 m-1 text-xs text-mouse-gray pl-1">
            <Input id="name" className="min-w-400" {...register("name", { required: "Name can't be blank" })} />
            <Input id="description" {...register("description")} />
            <Select id="status" className="max-w-28 text-xs" {...register("status")}>
              {OPTIONS_STATUS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            <Input id="wiki" {...register("wiki")} />
            <Input type="date" id="date" className="max-w-32" value={currentDate} min="2018-01-01" {...register("date")} />
            <Select id="sharing" className="max-w-40 text-xs" {...register("sharing")}>
              {OPTIONS_SHARING.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <Button type="submit" className="text-xs px-1.5 mr-1 leading-5 h-5 line border bg-slate-50 text-black">
          Create
        </Button>
      </form>
    </div>
  );
};

export default NewVersion;

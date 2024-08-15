import moment from "moment";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { aW } from "vitest/dist/reporters-B7ebVMkT.js";
import versionsApi from "~/apis/versions.api";
import ErrorImg from "~/assets/images/error-img.png";
import Button from "~/components/Button";
import DatePickerCustom from "~/components/DatePicker";
import EnhanceSelect from "~/components/EnhanceSelect";
import Input from "~/components/Input";
import Label from "~/components/Label";

interface IFormInput {
  name: string;
  description?: string;
  status: string;
  wiki_page_title: string;
  due_date: string;
  sharing: string;
}

const OPTIONS_STATUS = [
  { value: "open", label: "Open" },
  { value: "locked", label: "Locked" },
  { value: "closed", label: "Closed" },
];

const OPTIONS_SHARING = [
  { value: "none", label: "Not Shared" },
  { value: "descendants", label: "With sub projects" },
  { value: "hierarchy", label: "With project hierarchy" },
  { value: "tree", label: "With project tree" },
];

const NewVersion = () => {
  const navigate = useNavigate();
  const { id, name } = useParams();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>();

  const postNewVersions = async (data: IFormInput) => {
    const responses = await versionsApi.postNewVersions(Number(id), data);
    console.log(responses);
    if (responses.status === 201) {
      navigate(`/projects/${id}/${name}/roadmap`, { state: { isSuccess: true } });
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => postNewVersions(data);

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
            <Input id="name" className="min-w-400 text-xs" {...register("name", { required: "Name can't be blank" })} />
            <Input id="description" className=" text-xs" {...register("description")} />
            <EnhanceSelect arrayOption={OPTIONS_STATUS} id="status" className="max-w-28 text-xs" {...register("status")} />
            <Input id="wiki" className=" text-xs" {...register("wiki_page_title")} />
            <Controller
              control={control}
              name="due_date"
              render={({ field }) => (
                <DatePickerCustom
                  id="due_date"
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date) => field.onChange(date ? moment(date).format("YYYY-MM-DD") : "")}
                />
              )}
            />
            <EnhanceSelect arrayOption={OPTIONS_SHARING} id="sharing" className="max-w-28 mt-3 text-xs" {...register("sharing")} />
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

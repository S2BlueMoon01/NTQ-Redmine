import { Link } from "react-router-dom";
import Button from "~/components/Button";
import IconAdd from "~/assets/images/icon-add.png";

const Roadmap = () => {
  return (
    <div className="flex min-h-84">
      <div className="flex flex-col gap-2.5 bg-white w-9/12 px-3 mt-3 pb-8 border border-solid ">
        <div className="flex justify-between items-center p-1.5">
          <h2 className="text-xl text-mouse-gray font-semibold">Roadmap</h2>
          <Link className="flex	min-w-20 hover:underline" to="/time_entries/new">
            <img className="mr-1 w-fit h-fit" src={IconAdd} alt="Add" /> <p className="text-xs">New version</p>
          </Link>
        </div>
        <div className="flex flex-col gap-1.5 text-sm"></div>
      </div>

      <div className="p-8 flex flex-col gap-3 w-3/12 bg-[#eee] pr-3 pb-8">
        <h2 className="text-sm text-mouse-gray">Projects</h2>
        <div className="flex gap-1 items-center ">
          <input id="view-closed" type="checkbox" />
          <label htmlFor="view-closed" className="text-xs">
            View closed projects
          </label>
        </div>
        <Button className="w-14 ml-0">Apply</Button>
      </div>
    </div>
  );
};

export default Roadmap;

import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Filter from "../MyPage/_components/Filter";
import EnhanceSelect from "~/components/EnhanceSelect";
import Input from "~/components/Input/Input";
import Apply from "~/assets/images/apply-img.png";
import Reload from "~/assets/images/reload-img.png";
import Save from "~/assets/images/save.png";
import IconZoomIn from "~/assets/images/zoom_in.png";
import IconZoomOut from "~/assets/images/zoom_out.png";
import IconProject from "~/assets/images/latest-projects.png";
import IconTicket from "~/assets/images/ticket.png";
import DataTable from "./_component/DataTable";

const Gantt = () => {
  const { name } = useParams();

  const [issueActivity, setIssueActivity] = useState([
    { name: "View all issues", href: "#!" },
    { name: "Summary", href: "#!" },
    { name: "Calendar", href: "#!" },
    { name: "Gantt", href: "#!" },
  ]);

  const [trackerOptions, _setTrackerOptions] = useState([
    { label: "January", value: 1 },
    { label: "February", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 },
  ]);

  const [yearOptions, _setYearOptions] = useState([
    { label: "2019", value: 2019 },
    { label: "2020", value: 2020 },
    { label: "2021", value: 2021 },
    { label: "2022", value: 2022 },
    { label: "2023", value: 2023 },
    { label: "2024", value: 2024 },
    { label: "2025", value: 2025 },
    { label: "2026", value: 2026 },
    { label: "2027", value: 2027 },
    { label: "2028", value: 2028 },
    { label: "2029", value: 2029 },
  ]);

  const itemToolbar = [
    {
      label: "Apply",
      icon: Apply,
      action: () => console.log("*"),
    },
    {
      label: "Clear",
      icon: Reload,
      action: () => console.log("_"),
    },
    {
      label: "Save",
      icon: Save,
      action: () => console.log("+"),
    },
  ];
  return (
    <>
      <Helmet>
        <title>{`Gantt - ${name} - NTQ Redmine`}</title>
        <meta name="description" content="Redmine" />
      </Helmet>
      <div className="pt-2.5 flex">
        <div className="bg-white w-3/4 min-h-84 px-3 pt-2 border-neutral-300 border">
          <div className="text-xl font-semibold pt-0.5 pr-3 text-mouse-gray">Gantt</div>
          <div className="text-xs text-mouse-gray">
            <Filter />
            <div className="flex justify-between">
              <div className="flex items-center">
                <Input className="w-10" />
                <span>months from</span>
                <EnhanceSelect id="tracker" className="text-[13.33px] font-normal text-[black]" arrayOption={trackerOptions} defaultValue={8} />
                <EnhanceSelect id="tracker" className="text-[13.33px] font-normal text-[black]" arrayOption={yearOptions} defaultValue={8} />
                <div className="flex gap-1">
                  {itemToolbar.map((item) => {
                    return (
                      <div className="flex items-center gap-0.5 cursor-pointer">
                        <img src={item.icon} alt={item.label} className="size-4 mr-2" />
                        <a className="link">{item.label}</a>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex gap-0.5 items-center">
                <img src={IconZoomIn} alt="IconZoomIn" className="size-4" />
                <a href="#!" className="link">
                  Zoom in
                </a>
                <img src={IconZoomOut} alt="IconZoomOut" className="size-4" />
                <a href="#!" className="link">
                  Zoom out
                </a>
              </div>
            </div>
            <div className="flex border">
              <div className="w-80 flex-shrink-0">
                <div className="bg-[#eeeeee] h-[54px]"></div>
                <div className="p-2 border">
                  <div className="flex">
                    <img src={IconProject} alt="" />
                    <a href="#" className="link">
                      [Fresher]_ ReactJS Fresher
                    </a>
                  </div>
                  <ul className="pl-3">
                    <li className="flex items-center">
                      <img src={IconTicket} alt="" />
                      <a href="#!" className="link">
                        Bug #123591:
                      </a>
                      <span>hahahahaha</span>
                    </li>
                    <li className="flex items-center">
                      <img
                        className="size-4"
                        src="https://secure.gravatar.com/avatar/db626b64d07ad297ed9476b74313df13?rating=PG&size=50&default=mm"
                        alt=""
                      />
                      <a href="#!" className="link">
                        Bug #123596:
                      </a>
                      <span>dsfssfsd</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="overflow-x-auto overflow-y-hidden" style={{ width: "calc(100% - 171px)" }}>
                <DataTable />
              </div>
            </div>
          </div>
        </div>
        <div className="pt-4 pl-2">
          <h3 className="text-mouse-gray text-sm font-bold">Issues</h3>
          <div className="flex flex-col mt-3">
            {issueActivity.map((item) => {
              return (
                <a className="link" href={item.href} key={item.name}>
                  {item.name}
                </a>
              );
            })}
          </div>
          <div className="flex flex-col mt-3">
            <h3 className="text-mouse-gray text-sm font-bold">Custom queries</h3>

            <a className="link" href="#!">
              Ticket open by subProject
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gantt;

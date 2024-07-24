import React, { useEffect, useState } from "react";
import Filter from "../MyPage/_components/Filter";
import { Link } from "react-router-dom";
import IconAdd from "~/assets/images/icon-add.png";
import ApplyImg from "~/assets/images/apply-img.png";
import ReLoadImg from "~/assets/images/reload-img.png";
import DetailTimeEntries from "./_components/DetailTimeEntries";
import ReportTimeEntries from "./_components/ReportTimeEntries";
import moment from "moment";
import timeEntriesApi from "~/apis/timeEntries.api";

interface ListDataTime {
  id: number;
  project: string;
  date: string;
  user: string;
  activity: string;
  comment: string | undefined;
  hours: number;
}

const TimeEntry = () => {
  const [tabActive, setTabActive] = useState<boolean>(true);
  const [listTimeEntries, setListTimeEntries] = useState<ListDataTime[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchTimeEntries = async () => {
    try {
      const response = await timeEntriesApi.listTimeEntries();
      const listDataTable =
        response.data?.time_entries &&
        response.data?.time_entries.map((time) => {
          return {
            id: time.id,
            project: time.project.name,
            date: moment(time.created_on).format("MM/DD/YYYY"),
            user: time.user.name,
            activity: time.activity.name,
            comment: time.comments,
            hours: time.hours,
          };
        });
      setListTimeEntries(listDataTable);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeEntries();
  }, []);

  return (
    <div className="flex flex-col gap-3 pt-2">
      <div className="flex justify-between items-center text-ocean-blue">
        <a className="text-xs hover:underline cursor-pointer">
          All project <span className="text-[8px]">&gt;&gt;</span>
        </a>
        <Link className="flex	min-w-20 hover:underline" to="/time_entries/new">
          <img className="mr-1 w-fit h-fit" src={IconAdd} alt="Add" /> <p className="text-xs">log time</p>
        </Link>
      </div>
      <h2 className="text-base text-mouse-gray font-bold">Spent time</h2>
      <Filter />
      <Filter />
      <div className="flex text-xs gap-2 ">
        <button className="flex gap-1 hover:underline">
          <img src={ApplyImg} alt="apply" /> Apply
        </button>
        <button className="flex gap-1 hover:underline">
          <img src={ReLoadImg} alt="apply" /> Clear
        </button>
      </div>

      <ul className="flex items-center gap-2 text-xs font-semibold text-mouse-gray px-2 border-b">
        <li
          onClick={() => setTabActive(!tabActive)}
          className={`relative bottom-[-1px] rounded-tl-md rounded-tr-md p-1 border z-10 cursor-pointer ${tabActive ? "border-b-[#fff]" : "bg-[#f6f6f6] text-[#999] hover:bg-yellow-custom-10"}`}
        >
          Detail
        </li>
        <li
          onClick={() => setTabActive(!tabActive)}
          className={`relative bottom-[-1px] rounded-tl-md rounded-tr-md p-1 border z-10 cursor-pointer ${!tabActive ? "border-b-[#fff]" : "bg-[#f6f6f6] text-[#999] hover:bg-yellow-custom-10"}`}
        >
          Report
        </li>
      </ul>
      {tabActive ? <DetailTimeEntries dataTable={listTimeEntries} loading={isLoading} /> : <ReportTimeEntries />}
    </div>
  );
};

export default TimeEntry;

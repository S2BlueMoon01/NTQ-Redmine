import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IconAdd from "~/assets/images/icon-add.png";
import CloseImg from "~/assets/images/close-img.png";
import TableSpentTime from "../TableSpentTime";
import timeEntriesApi from "~/apis/timeEntries.api";
import { TimeEntriesTable } from "~/types/timeEntries.type";
import moment from "moment";

const columnNames = ["Activity", "Project", "Comment", "Hours", "Action"];

interface ChildComponentProps {
  handleOnChange?: () => void;
  isShowButtonClose: boolean;
}

const SpentTime: React.FC<ChildComponentProps> = ({ handleOnChange, isShowButtonClose = false }) => {
  const [listTimeEntries, setListTimeEntries] = useState<TimeEntriesTable[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const totalHours = listTimeEntries && listTimeEntries.reduce((acc, current) => acc + current.hours, 0).toFixed(2);

  const fetchTimeEntries = async () => {
    try {
      const response = await timeEntriesApi.listTimeEntries({ user_id: "me" });
      const listTime =
        response.data?.time_entries &&
        response.data?.time_entries.map((time_entries) => {
          return {
            id: time_entries.id,
            activity: time_entries.activity.name,
            comment: time_entries.comments,
            hours: time_entries.hours,
            project: time_entries.project.name,
            date: moment(time_entries.created_on).format("MM/DD/YYYY"),
          };
        });
      setListTimeEntries(listTime);
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
    <div className=" flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <Link className="text-ocean-blue font-semibold	hover:underline " to="/time_entries">
            Spent Time
          </Link>
          <p className="text-16 text-mouse-gray font-medium">(last 7 days)</p>
        </div>
        {isShowButtonClose && <img className="w-fit h-fit mr-3 cursor-pointer" onClick={handleOnChange} src={CloseImg} alt="closeButton" />}
      </div>
      <div className="flex justify-between">
        <p className="text-mouse-gray font-semibold	">Total Time: {totalHours}</p>
        <Link className="flex	min-w-20 hover:underline" to="/time_entries/new">
          <img className="mr-1 w-fit h-fit" src={IconAdd} alt="Add" /> <p className="text-xs">log time</p>
        </Link>
      </div>
      <TableSpentTime className="bg-slate-500 min-w-full " loading={isLoading} columnNames={columnNames} dataTable={listTimeEntries} />
    </div>
  );
};

export default SpentTime;

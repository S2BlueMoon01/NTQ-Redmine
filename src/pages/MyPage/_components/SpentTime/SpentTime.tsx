import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import timeEntriesApi from "~/apis/timeEntries.api";
import CloseImg from "~/assets/images/close-img.png";
import IconAdd from "~/assets/images/icon-add.png";
import { optionBlockMyPage } from "~/constants/constants";
import { useGlobalStore } from "~/store/globalStore";
import { TimeEntriesTable } from "~/types/timeEntries.type";
import { removeBlockFromBoardSections } from "~/utils/utils";
import TableSpentTime from "../TableSpentTime";
import { useQuery } from "@tanstack/react-query";
import config from "~/constants/config";

const columnNames = ["Activity", "Project", "Comment", "Hours", "Action"];

const fetchTimeEntries = async (): Promise<TimeEntriesTable[]> => {
  const response = await timeEntriesApi.listTimeEntries({ user_id: "me" });
  return (
    response.data?.time_entries?.map((time_entries) => ({
      id: time_entries.id,
      activity: time_entries.activity.name,
      comment: time_entries.comments,
      hours: time_entries.hours,
      project: time_entries.project.name,
      date: moment(time_entries.created_on).format("MM/DD/YYYY"),
    })) || []
  );
};

const SpentTime: React.FC = () => {
  const { isEditMyPage, removeBlock } = useGlobalStore((state) => ({
    isEditMyPage: state.isEditMyPage,
    removeBlock: state.removeBlock,
  }));

  const { data: listTimeEntries = [], isLoading } = useQuery({
    queryKey: ["timeEntries"],
    queryFn: fetchTimeEntries,
    staleTime: config.staleTime,
  });

  const totalHours = listTimeEntries.reduce((acc, current) => acc + current.hours, 0).toFixed(2);

  const handleClose = () => {
    const blockId = optionBlockMyPage.find((block) => block.title === "Spent time")?.id || "";
    removeBlockFromBoardSections({
      blockId: blockId,
    });
    removeBlock(blockId);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <Link className="text-ocean-blue font-semibold hover:underline" to="/time_entries">
            Spent Time
          </Link>
          <p className="text-16 text-mouse-gray font-medium">(last 7 days)</p>
        </div>
        {isEditMyPage && <img className="w-fit h-fit mr-3 cursor-pointer" onClick={handleClose} src={CloseImg} alt="closeButton" />}
      </div>
      <div className="flex justify-between">
        <p className="text-mouse-gray font-semibold">Total Time: {totalHours}</p>
        <Link className="flex min-w-20 hover:underline" to="/time_entries/new">
          <img className="mr-1 w-fit h-fit" src={IconAdd} alt="Add" /> <p className="text-xs">log time</p>
        </Link>
      </div>
      <TableSpentTime className="bg-slate-500 min-w-full" loading={isLoading} columnNames={columnNames} dataTable={listTimeEntries} />
    </div>
  );
};

export default SpentTime;

import React from "react";
import "./Calendar.css";
import Card from "~/pages/MyPage/_components/Card/Card";
import { getWeekNumber, groupTasksByExactDate, getWeekDates, getDay, removeBlockFromBoardSections } from "~/utils/utils";
import { Issue } from "~/types/issue.type";
import { SyncLoader } from "react-spinners";
import CloseImg from "~/assets/images/close-img.png";
import { useGlobalStore } from "~/store/globalStore";
import { optionBlockMyPage } from "~/constants/constants";
import issuesApi from "~/apis/issue.api";
import { checkDateStatus } from "~/utils/utils";
import { useQuery } from "@tanstack/react-query";
import config from "~/constants/config";

const fetchListIssue = async (): Promise<Issue[]> => {
  const response = await issuesApi.listIssues();
  return response.data.issues;
};

const Calendar: React.FC = () => {
  const { isEditMyPage, removeBlock } = useGlobalStore((state) => ({
    isEditMyPage: state.isEditMyPage,
    removeBlock: state.removeBlock,
  }));
  const week = getWeekNumber(new Date())[1];

  const { data: listIssues = [], isLoading } = useQuery({
    queryKey: ["listIssues"],
    queryFn: fetchListIssue,
    staleTime: config.staleTime,
  });

  const daysOfWeek = getWeekDates(week);

  const mainArrays = groupTasksByExactDate(listIssues, daysOfWeek);

  const handleClose = () => {
    const blockId = optionBlockMyPage.find((block) => block.title === "Calendar")?.id || "";
    removeBlockFromBoardSections({
      blockId: blockId,
    });
    removeBlock(blockId);
  };

  return (
    <>
      <SyncLoader loading={isLoading} color="#169" size={5} />
      <div className="flex justify-between items-center ">
        <h2 className="text-base text-mouse-gray font-bold">Calendar</h2>
        {isEditMyPage && <img className="w-fit h-fit mr-3 cursor-pointer" onClick={handleClose} src={CloseImg} alt="closeButton" />}
      </div>
      <table className="w-full border-collapse table-fixed">
        <thead>
          <tr>
            <th className="w-[22px] p-1"></th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
            <th>Sunday</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-xs w-[22px] p-1 text-mouse-gray ">{week}</td>
            {mainArrays.map((item) => {
              const day = Object.keys(item)[0];
              const isCurrentDay = getDay() === day;
              return (
                <td key={day} className={`${isCurrentDay ? "bg-light-yellow" : ""} hover:bg-light-yellow relative pt-8 text-xs`}>
                  <div className={`${isCurrentDay ? "font-bold" : ""} text-right text-[#505050] absolute top-1 right-1`}>{day}</div>
                  {item[day].map((issue) => (
                    <div key={issue.id} className="py-1">
                      <div className="flex flex-wrap p-1.5 w-full text-[10.8px] text-mouse-gray bg-light-yellow border relative card">
                        {issue.project.name}-
                        <span>
                          <img src={checkDateStatus({ startDate: issue.start_date, dueDate: issue.due_date, day })} alt="ArrowRightIcon" />
                        </span>
                        <a href="#!" className="text-ocean-blue ">
                          {issue.tracker.name} #{issue.id}:
                        </a>
                        {issue.subject}
                        <Card issue={issue} day={day} />
                      </div>
                    </div>
                  ))}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Calendar;

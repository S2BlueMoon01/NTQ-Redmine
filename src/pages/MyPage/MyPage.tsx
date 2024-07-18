import React, { useState } from "react";
import useScrollToTop from "~/hooks/useScrollToTop";
import IconAdd from "~/assets/images/icon-add.png";
import IconBack from "~/assets/images/icon-back.png";
import BoardSectionList from "~/components/BoardSectionList";
import Calendar from "./_components/Calendar";
import ReportedIssues from "./_components/ReportedIssues/ReportedIssues";
import IssuesAssigned from "./_components/IssuesAsigned";
import WatchedIssues from "./_components/WatchedIssues";
import SpentTime from "./_components/SpentTime";

const optionBlock = ["Issues assigned to me", "Reported issues", "Watched issues", "Latest news", "Calendar", "Documents", "Spent time"];

// const tables = [
//   { id: 1, name: "Spent time", columnNames: ["Activity", "Project", "Comment", "Hours"], dataTable: [newData, ...dataTime], action: true },
//   { id: 2, name: "Watched issues", columnNames: ["#", "Project", "Tracker", "Subject"], dataTable: dataTable },
//   { id: 3, name: "Reported issues", columnNames: ["#", "Project", "Tracker", "Subject"], dataTable: dataTable },
//   { id: 4, name: "Issues assigned to me", columnNames: ["#", "Project", "Tracker", "Subject"], dataTable: dataTable },
// ];

const MyPage = () => {
  useScrollToTop();
  const [isShowPersonalize, setIsShowPersonalize] = useState<boolean>(false);

  return (
    <>
      <div className="p-2.5 pt-1 flex items-center justify-between ">
        <h2 className="text-xl font-semibold pt-0.5 pr-3 mb-3 text-mouse-gray">My page</h2>
        <>
          {isShowPersonalize ? (
            <div className="text-xs text-mouse-gray flex items-center">
              <label>My page block:</label>
              <select className="border border-solid py-1 ml-1" defaultValue="">
                <option value="">Select an option</option>
                {optionBlock.length > 0 && optionBlock.map((item) => <option key={item}>{item}</option>)}
              </select>
              <button className="text-ocean-blue ml-2 hover:underline flex">
                <img className="mr-1" src={IconAdd} alt="Add" /> Add
              </button>
              <button className="text-ocean-blue ml-2 hover:underline flex" onClick={() => setIsShowPersonalize(!isShowPersonalize)}>
                <img className="mr-1" src={IconBack} alt="Back" /> Back
              </button>
            </div>
          ) : (
            <p className="text-ocean-blue text-xs cursor-pointer leading-6 hover:underline" onClick={() => setIsShowPersonalize(!isShowPersonalize)}>
              Personalize this page
            </p>
          )}
        </>
      </div>

      <div className="pt-2">
        <div className="grid gap-6 ">
          <Calendar />
          <SpentTime />
          <WatchedIssues />
        </div>

        <div className="mt-6 grid gap-6 grid-cols-2">
          <ReportedIssues />
          <IssuesAssigned />
        </div>
        <BoardSectionList />
      </div>
    </>
  );
};

export default MyPage;

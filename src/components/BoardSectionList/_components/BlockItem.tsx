import React from "react";
import Calendar from "~/pages/MyPage/_components/Calendar";
import IssuesAssigned from "~/pages/MyPage/_components/IssuesAsigned";
import ReportedIssues from "~/pages/MyPage/_components/ReportedIssues";
import WatchedIssues from "~/pages/MyPage/_components/WatchedIssues";
import SpentTime from "~/pages/TimeEntryCreate/TimeEntryCreate";
import { Block } from "~/types/utils.type";

type BlockItemProps = {
  block: Block;
};

const BlockItem = ({ block }: BlockItemProps) => {
  const renderBlock = () => {
    switch (block.title) {
      case "Calendar":
        return <Calendar />;
      case "Spent time":
        return <SpentTime />;
      case "Watched issues":
        return <WatchedIssues />;
      case "Reported issues":
        return <ReportedIssues />;
      case "Issues assigned to me":
        return <IssuesAssigned />;
      case "Latest news":
        return <p>Latest news</p>;
      case "Documents":
        return <p>Documents</p>;
      default:
        return <div>{block.title}</div>; // Render tiêu đề task nếu không có match nào
    }
  };
  return <div className="bg-white p-4 rounded shadow select-none">{renderBlock()}</div>;
};

export default BlockItem;

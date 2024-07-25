import Calendar from "~/pages/MyPage/_components/Calendar";
import IssuesAssigned from "~/pages/MyPage/_components/IssuesAssigned";
import ReportedIssues from "~/pages/MyPage/_components/ReportedIssues";
import SpentTime from "~/pages/MyPage/_components/SpentTime";
import WatchedIssues from "~/pages/MyPage/_components/WatchedIssues";
import { Block } from "~/types/utils.type";

type BlockItemProps = {
  block: Block;
};

const BlockItem = ({ block }: BlockItemProps) => {
  const renderBlock = () => {
    switch (block.title) {
      case "Calendar":
        return <Calendar />;
      case "Watched issues":
        return <WatchedIssues />;
      case "Reported issues":
        return <ReportedIssues />;
      case "Issues assigned to me":
        return <IssuesAssigned />;
      case "Spent time":
        return <SpentTime />;
      case "Latest news":
        return <p>Latest news</p>;
      case "Documents":
        return <p>Documents</p>;
      default:
        return <div>{block.title}</div>;
    }
  };
  return <div className="bg-white p-4 rounded shadow select-none">{renderBlock()}</div>;
};

export default BlockItem;

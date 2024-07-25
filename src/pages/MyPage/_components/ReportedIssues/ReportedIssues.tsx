import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import issuesApi from "~/apis/issue.api";
import CloseImg from "~/assets/images/close-img.png";
import { optionBlockMyPage } from "~/constants/constants";
import { useGlobalStore } from "~/store/globalStore";
import TableIssues from "~/components/TableIssues";
import { IssueTable } from "~/types/issue.type";
import { removeBlockFromBoardSections } from "~/utils/utils";

const columnNames = ["#", "project", "tracker", "subject"];

const ReportedIssues: React.FC = () => {
  const { isEditMyPage, removeBlock } = useGlobalStore((state) => ({
    isEditMyPage: state.isEditMyPage,
    removeBlock: state.removeBlock,
  }));
  const [listReportedIssues, setListReportedIssues] = useState<IssueTable[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchReportedIssues = async () => {
    try {
      const response = await issuesApi.listIssues({ author_id: "me" });
      const reportedIssues =
        response.data?.issues &&
        response.data?.issues.map((issue) => {
          return {
            "#": issue.id,
            subject: issue.subject,
            tracker: issue.tracker.name,
            project: issue.project.name,
          };
        });
      setListReportedIssues(reportedIssues);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    const blockId = optionBlockMyPage.find((block) => block.title === "Reported issues")?.id || "";
    removeBlockFromBoardSections({
      blockId: blockId,
    });
    removeBlock(blockId);
  };

  useEffect(() => {
    fetchReportedIssues();
  }, []);
  return (
    <div>
      <div className="flex justify-between items-center ">
        <Link className="text-ocean-blue font-semibold	hover:underline " to="/issues">
          Reported issues ({listReportedIssues.length > 0 ? listReportedIssues.length : 0})
        </Link>
        {isEditMyPage && <img className="w-fit h-fit mr-3 cursor-pointer" onClick={() => handleClose()} src={CloseImg} alt="closeButton" />}
      </div>
      <TableIssues className="bg-slate-500 min-w-full mt-3" loading={isLoading} columnNames={columnNames} dataTable={listReportedIssues} />
    </div>
  );
};

export default ReportedIssues;

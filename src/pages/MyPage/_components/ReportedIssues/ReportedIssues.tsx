import React, { useEffect, useState } from "react";
import issuesApi from "~/apis/issue.api";
import Table from "~/components/Table";
import CloseImg from "~/assets/images/close-img.png";
import { Link } from "react-router-dom";
import { useGlobalStore } from "~/store/global-store";
import { removeBlockFromBoardSections } from "~/utils/utils";
import { optionBlockMyPage } from "~/constants/constants";

const columnNames = ["#", "Project", "Tracker", "Subject"];

type IssueTableType = {
  "#": number;
  Project: string | undefined;
  Tracker: string | undefined;
  Subject: string | undefined;
};

const ReportedIssues: React.FC = () => {
  const { isEditMyPage, removeBlock } = useGlobalStore((state) => ({
    isEditMyPage: state.isEditMyPage,
    removeBlock: state.removeBlock,
  }));
  const [listReportedIssues, setListReportedIssues] = useState<IssueTableType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchReportedIssues = async () => {
    try {
      const response = await issuesApi.listIssues();
      const reportedIssues =
        response.data?.issues &&
        response.data?.issues
          .filter((issue) => issue.author?.id === 2805)
          .map((issue) => {
            return {
              "#": issue.id,
              Subject: issue.subject,
              Tracker: issue.tracker.name,
              Project: issue.project.name,
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
      <Table className="bg-slate-500 min-w-full mt-3" loading={isLoading} columnNames={columnNames} dataTable={listReportedIssues} />
    </div>
  );
};

export default ReportedIssues;

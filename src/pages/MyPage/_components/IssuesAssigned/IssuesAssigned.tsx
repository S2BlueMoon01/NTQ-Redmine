import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import issuesApi from "~/apis/issue.api";
import Table from "~/components/Table";
import CloseImg from "~/assets/images/close-img.png";
import { useGlobalStore } from "~/store/global-store";
import { removeBlockFromBoardSections } from "~/utils/utils";
import { optionBlockMyPage } from "~/constants/constants";

type IssueTableType = {
  "#": number;
  Project: string | undefined;
  Tracker: string | undefined;
  Subject: string | undefined;
};

const columnNames = ["#", "Project", "Tracker", "Subject"];

const IssuesAssigned: React.FC = () => {
  const { isEditMyPage, removeBlock } = useGlobalStore((state) => ({
    isEditMyPage: state.isEditMyPage,
    removeBlock: state.removeBlock,
  }));
  const [listIssuesAssigned, setListIssuesAssigned] = useState<IssueTableType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchIssuesAssigned = async () => {
    try {
      const response = await issuesApi.listIssues({ assigned_to_id: 2805 });
      const listIssues =
        response.data?.issues &&
        response.data?.issues.map((issue) => {
          return {
            "#": issue.id,
            Subject: issue.subject,
            Tracker: issue.tracker.name,
            Project: issue.project.name,
          };
        });
      setListIssuesAssigned(listIssues);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    const blockId = optionBlockMyPage.find((block) => block.title === "Issues assigned to me")?.id || "";
    removeBlockFromBoardSections({
      blockId: blockId,
    });
    removeBlock(blockId);
  };

  useEffect(() => {
    fetchIssuesAssigned();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <Link className="text-ocean-blue font-semibold	hover:underline " to="/issues">
          Issues assigned to me ({listIssuesAssigned.length > 0 ? listIssuesAssigned.length : 0})
        </Link>
        {isEditMyPage && <img className="w-fit h-fit mr-3 cursor-pointer" onClick={() => handleClose()} src={CloseImg} alt="closeButton" />}
      </div>
      <Table className="bg-slate-500 min-w-full mt-3" loading={isLoading} columnNames={columnNames} dataTable={listIssuesAssigned} />
    </div>
  );
};

export default IssuesAssigned;

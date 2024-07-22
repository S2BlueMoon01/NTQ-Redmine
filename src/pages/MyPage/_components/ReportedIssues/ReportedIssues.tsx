import React, { useEffect, useState } from "react";
import issuesApi from "~/apis/issue.api";
import Table from "~/components/Table";
import CloseImg from "~/assets/images/close-img.png";
import { Link } from "react-router-dom";
import { IssueTable } from "~/types/issue.type";

const columnNames = ["#", "project", "tracker", "subject"];

interface ChildComponentProps {
  handleOnChange?: () => void;
  isShowButtonClose: boolean;
}

const ReportedIssues: React.FC<ChildComponentProps> = ({ handleOnChange, isShowButtonClose = false }) => {
  const [listReportedIssues, setListReportedIssues] = useState<IssueTable[]>([]);
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

  useEffect(() => {
    fetchReportedIssues();
  }, []);
  return (
    <div>
      <div className="flex justify-between items-center ">
        <Link className="text-ocean-blue font-semibold	hover:underline " to="/issues">
          Reported issues ({listReportedIssues.length > 0 ? listReportedIssues.length : 0})
        </Link>
        {isShowButtonClose && <img className="w-fit h-fit mr-3 cursor-pointer" onClick={handleOnChange} src={CloseImg} alt="closeButton" />}
      </div>
      <Table className="bg-slate-500 min-w-full mt-3" loading={isLoading} columnNames={columnNames} dataTable={listReportedIssues} />
    </div>
  );
};

export default ReportedIssues;

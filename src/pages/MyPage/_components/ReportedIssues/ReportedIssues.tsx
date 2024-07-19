import React, { useEffect, useState } from "react";
import issuesApi from "~/apis/issue.api";
import Table from "~/components/Table";

const columnNames = ["#", "Project", "Tracker", "Subject"];

type IssueTableType = {
  "#": number;
  Project: string | undefined;
  Tracker: string | undefined;
  Subject: string | undefined;
};

const ReportedIssues = () => {
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
      console.log(reportedIssues);
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
      <a className="text-ocean-blue font-semibold	hover:underline " href="">
        Reported issues ({listReportedIssues.length > 0 ? listReportedIssues.length : 0})
      </a>
      <Table className="bg-slate-500 min-w-full mt-3" loading={isLoading} columnNames={columnNames} dataTable={listReportedIssues} />
    </div>
  );
};

export default ReportedIssues;

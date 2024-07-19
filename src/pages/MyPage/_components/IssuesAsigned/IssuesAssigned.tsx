import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import issuesApi from "~/apis/issue.api";
import Table from "~/components/Table";

type IssueTableType = {
  "#": number;
  Project: string | undefined;
  Tracker: string | undefined;
  Subject: string | undefined;
};

const columnNames = ["#", "Project", "Tracker", "Subject"];

const IssuesAssigned = () => {
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

  useEffect(() => {
    fetchIssuesAssigned();
  }, []);

  return (
    <div>
      <Link className="text-ocean-blue font-semibold	hover:underline " to="/issues">
        Issues assigned to me ({listIssuesAssigned.length > 0 ? listIssuesAssigned.length : 0})
      </Link>
      <Table className="bg-slate-500 min-w-full mt-3" loading={isLoading} columnNames={columnNames} dataTable={listIssuesAssigned} />
    </div>
  );
};

export default IssuesAssigned;

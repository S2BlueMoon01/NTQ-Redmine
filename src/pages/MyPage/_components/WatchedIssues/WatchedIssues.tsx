import React, { useEffect, useState } from "react";
import issuesApi from "~/apis/issue.api";
import Table from "~/components/Table";
import CloseImg from "~/assets/images/close-img.png";
import { Link } from "react-router-dom";
import { IssueTable } from "~/types/issue.type";

interface ChildComponentProps {
  handleOnChange?: () => void;
  isShowButtonClose: boolean;
}

const columnNames = ["#", "project", "tracker", "subject"];

const WatchedIssues: React.FC<ChildComponentProps> = ({ handleOnChange, isShowButtonClose = false }) => {
  const [listIssuesWatcher, setListIssuesWatcher] = useState<IssueTable[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchIssuesWatcher = async () => {
    try {
      const response = await issuesApi.listIssues({ watcher_id: "me" });
      const listIssues =
        response.data?.issues &&
        response.data?.issues.map((issue) => {
          return {
            "#": issue.id,
            subject: issue.subject,
            tracker: issue.tracker.name,
            project: issue.project.name,
          };
        });
      setListIssuesWatcher(listIssues);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIssuesWatcher();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center ">
        <Link className="text-ocean-blue font-semibold	hover:underline " to="/issues">
          Watched issues ({listIssuesWatcher && listIssuesWatcher.length > 0 ? listIssuesWatcher.length : 0})
        </Link>
        {isShowButtonClose && <img className="w-fit h-fit mr-3 cursor-pointer" onClick={handleOnChange} src={CloseImg} alt="closeButton" />}
      </div>
      <Table className="bg-slate-500 min-w-full mt-3" loading={isLoading} columnNames={columnNames} dataTable={listIssuesWatcher} />
    </div>
  );
};

export default WatchedIssues;

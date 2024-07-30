import { Issue } from "~/types/issue.type";

type ProgressProps = {
  issues: Issue[];
};

const ProgressBar: React.FC<ProgressProps> = ({ issues }) => {
  const totalIssues = issues.length;
  const closedIssues = issues.filter((issue) => issue.status.name === "Closed").length;
  const newIssues = issues.filter((issue) => issue.status.name === "New").length;
  const percentageClosed = (closedIssues / totalIssues) * 100;
  const percentageOpen = (newIssues / totalIssues) * 100;
  return (
    <>
      <div className="flex items-center">
        <div className="w-full bg-gray-200 h-6 flex items-center ">
          <div className="bg-green-200 h-6 " style={{ width: `${percentageOpen}%` }} />
          <div className="bg-gray-200 h-6" style={{ width: `${percentageClosed}%` }} />
        </div>
        <span className=" left-2/4 ml-2 text-sm text-gray-600">{`${(percentageClosed + percentageOpen).toFixed(0)}%`}</span>
      </div>

      <div className="text-xs mt-2">
        <a href="#" className="text-ocean-blue hover:underline">
          {issues.length} issues
        </a>
        <span>
          {" "}
          ({closedIssues} closed —{" "}
          <a href="" className="text-ocean-blue hover:underline">
            {newIssues} open
          </a>
          )
        </span>
      </div>
    </>
  );
};

export default ProgressBar;

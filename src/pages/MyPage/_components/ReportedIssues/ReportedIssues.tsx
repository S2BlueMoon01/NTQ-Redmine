import React from "react";
import Table from "~/components/Table";

const columnNames = ["#", "Project", "Tracker", "Subject"];
const dataTable = [
  { "#": 122668, Project: "[Fresher]_ReactJS Fresher", Tracker: "Bug", Subject: "Lỗi Login (New)" },
  { "#": 122640, Project: "[Fresher]_ReactJS Fresher", Tracker: "Task", Subject: "task abcd (Build)" },
  { "#": 122638, Project: "[Fresher]_ReactJS Fresher", Tracker: "Task", Subject: "Clone Redmine 2 (New)" },
];

const ReportedIssues = () => {
  return (
    <div>
      <a className="text-ocean-blue font-semibold	hover:underline " href="">
        Reported issues ({dataTable && dataTable.length > 0 ? dataTable.length : 0})
      </a>
      <Table className="bg-slate-500 min-w-full mt-3" columnNames={columnNames} dataTable={dataTable} />
    </div>
  );
};

export default ReportedIssues;

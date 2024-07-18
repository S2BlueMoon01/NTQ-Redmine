import React from "react";
import { Link } from "react-router-dom";
import Table from "~/components/Table";
import IconAdd from "~/assets/images/icon-add.png";

const dataTime = [
  { Activity: "Create", Project: "[Fresher]_ReactJS Fresher", Comment: "Lỗi Login (New)", Hours: "2" },
  { Activity: "Create", Project: "[Fresher]_ReactJS Fresher", Comment: "Lỗi Login (New)", Hours: "2" },
  { Activity: "Create", Project: "[Fresher]_ReactJS Fresher", Comment: "Lỗi Login (New)", Hours: "2" },
];
const dataTable = [
  { "#": 122668, Project: "[Fresher]_ReactJS Fresher", Tracker: "Bug", Subject: "Lỗi Login (New)" },
  { "#": 122640, Project: "[Fresher]_ReactJS Fresher", Tracker: "Task", Subject: "task abcd (Build)" },
  { "#": 122638, Project: "[Fresher]_ReactJS Fresher", Tracker: "Task", Subject: "Clone Redmine 2 (New)" },
];

const totalHours = dataTime.reduce((acc, current) => acc + parseInt(current.Hours), 0);

const newData = {
  Activity: "Today",
  Project: "",
  Comment: "",
  Hours: totalHours.toString(),
};

const tables = [
  { id: 1, name: "Spent time", columnNames: ["Activity", "Project", "Comment", "Hours"], dataTable: [newData, ...dataTime], action: true },
  { id: 2, name: "Watched issues", columnNames: ["#", "Project", "Tracker", "Subject"], dataTable: dataTable },
  { id: 3, name: "Reported issues", columnNames: ["#", "Project", "Tracker", "Subject"], dataTable: dataTable },
  { id: 4, name: "Issues assigned to me", columnNames: ["#", "Project", "Tracker", "Subject"], dataTable: dataTable },
];

const SpentTime = () => {
  return (
    <div className=" flex flex-col gap-4">
      <div className="flex gap-3">
        <a className="text-ocean-blue font-semibold	hover:underline " href="">
          {tables && tables.length > 0 && tables[0].name}
        </a>
        <p className="text-16 text-mouse-gray font-medium">(last 7 days)</p>
      </div>
      <div className="flex justify-between">
        <p className="text-mouse-gray font-semibold	">Total Time: {totalHours}.00</p>
        <Link className="flex	min-w-20 hover:underline" to="/time_entries/new">
          <img className="mr-1 w-fit h-fit" src={IconAdd} alt="Add" /> <p className="text-xs">log time</p>
        </Link>
      </div>
      <Table className="bg-slate-500 min-w-full " columnNames={tables[0].columnNames} dataTable={tables[0].dataTable} action={tables[0].action} />
    </div>
  );
};

export default SpentTime;

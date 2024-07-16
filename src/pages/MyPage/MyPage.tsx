import React, { useState } from "react";
import useScrollToTop from "~/hooks/useScrollToTop";
import IconAdd from "~/assets/images/icon-add.png";
import IconBack from "~/assets/images/icon-back.png";
import Table from "../../components/Table";
import Calendar from "./_components/Calendar";
import { Link } from "react-router-dom";

const optionBlock = ["Issues assigned to me", "Reported issues", "Watched issues", "Latest news", "Calendar", "Documents", "Spent time"];
const columnNames = ["#", "Project", "Tracker", "Subject"];
const dataTable = [
  { "#": 122668, Project: "[Fresher]_ReactJS Fresher", Tracker: "Bug", Subject: "Lỗi Login (New)" },
  { "#": 122640, Project: "[Fresher]_ReactJS Fresher", Tracker: "Task", Subject: "task abcd (Build)" },
  { "#": 122638, Project: "[Fresher]_ReactJS Fresher", Tracker: "Task", Subject: "Clone Redmine 2 (New)" },
];

const dataTime = [
  { Activity: "Create", Project: "[Fresher]_ReactJS Fresher", Comment: "Lỗi Login (New)", Hours: "2" },
  { Activity: "Create", Project: "[Fresher]_ReactJS Fresher", Comment: "Lỗi Login (New)", Hours: "2" },
  { Activity: "Create", Project: "[Fresher]_ReactJS Fresher", Comment: "Lỗi Login (New)", Hours: "2" },
];

const totalHours = dataTime.reduce((acc, current) => acc + parseInt(current.Hours), 0);

const newData = {
  Activity: "Today",
  Project: "", // Lấy Project từ phần tử đầu tiên của dataTime (giả sử tất cả cùng một Project)
  Comment: "", // Không có comment
  Hours: totalHours.toString(), // Chuyển tổng Hours thành chuỗi
};

const tables = [
  { id: 1, name: "Spent time", columnNames: ["Activity", "Project", "Comment", "Hours"], dataTable: [newData, ...dataTime], action: true },
  { id: 2, name: "Watched issues", columnNames: ["#", "Project", "Tracker", "Subject"], dataTable: dataTable },
  { id: 3, name: "Reported issues", columnNames: ["#", "Project", "Tracker", "Subject"], dataTable: dataTable },
  { id: 4, name: "Issues assigned to me", columnNames: ["#", "Project", "Tracker", "Subject"], dataTable: dataTable },
];

const MyPage = () => {
  useScrollToTop();
  const [isShowPersonalize, setIsShowPersonalize] = useState<boolean>(false);

  return (
    <>
      <div className="p-2.5 pt-1 flex items-center justify-between ">
        <h2 className="text-xl font-semibold pt-0.5 pr-3 mb-3 text-mouse-gray">My page</h2>
        <>
          {isShowPersonalize ? (
            <div className="text-xs text-mouse-gray flex items-center">
              <label>My page block:</label>
              <select className="border border-solid py-1 ml-1" defaultValue="">
                <option value="">Select an option</option>
                {optionBlock.length > 0 && optionBlock.map((item) => <option key={item}>{item}</option>)}
              </select>
              <button className="text-ocean-blue ml-2 hover:underline flex">
                <img className="mr-1" src={IconAdd} alt="Add" /> Add
              </button>
              <button className="text-ocean-blue ml-2 hover:underline flex" onClick={() => setIsShowPersonalize(!isShowPersonalize)}>
                <img className="mr-1" src={IconBack} alt="Back" /> Back
              </button>
            </div>
          ) : (
            <p className="text-ocean-blue text-xs cursor-pointer leading-6 hover:underline" onClick={() => setIsShowPersonalize(!isShowPersonalize)}>
              Personalize this page
            </p>
          )}
        </>
      </div>

      <div className="pt-2">
        <div className="grid gap-6 ">
          <Calendar />

          <div className=" flex flex-col gap-4">
            <a className="text-ocean-blue font-semibold	hover:underline " href="">
              {tables && tables.length > 0 && tables[0].name}
            </a>
            <div className="flex justify-between">
              <p className="text-mouse-gray font-semibold	">Total Time: {totalHours}.00</p>
              <Link className="hover:underline" to="/my-page/add-time">
                Add
              </Link>
            </div>
            <Table
              className="bg-slate-500 min-w-full "
              columnNames={tables[0].columnNames}
              dataTable={tables[0].dataTable}
              action={tables[0].action}
            />
          </div>

          <div>
            <a className="text-ocean-blue font-semibold	hover:underline " href="">
              Watched issues ({dataTable && dataTable.length > 0 ? dataTable.length : 0})
            </a>
            <Table className="bg-slate-500 min-w-full mt-4" columnNames={columnNames} dataTable={dataTable} />
          </div>
        </div>

        <div className="mt-6 grid gap-6 grid-cols-2">
          <div>
            <a className="text-ocean-blue font-semibold	hover:underline " href="">
              Reported issues ({dataTable && dataTable.length > 0 ? dataTable.length : 0})
            </a>
            <Table className="bg-slate-500 min-w-full mt-3" columnNames={columnNames} dataTable={dataTable} />
          </div>
          <div>
            <a className="text-ocean-blue font-semibold	hover:underline " href="">
              Issues assigned to me ({dataTable && dataTable.length > 0 ? dataTable.length : 0})
            </a>
            <Table className="bg-slate-500 min-w-full mt-3" columnNames={columnNames} dataTable={dataTable} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;

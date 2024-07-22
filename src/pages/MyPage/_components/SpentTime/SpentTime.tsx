import React from "react";
import { Link } from "react-router-dom";
import Table from "~/components/Table";
import IconAdd from "~/assets/images/icon-add.png";
import CloseImg from "~/assets/images/close-img.png";
import { removeBlockFromBoardSections } from "~/utils/utils";
import { optionBlockMyPage } from "~/constants/constants";
import { useGlobalStore } from "~/store/global-store";

const dataTime = [
  { Activity: "Create", Project: "[Fresher]_ReactJS Fresher", Comment: "Lỗi Login (New)", Hours: "2" },
  { Activity: "Create", Project: "[Fresher]_ReactJS Fresher", Comment: "Lỗi Login (New)", Hours: "2" },
  { Activity: "Create", Project: "[Fresher]_ReactJS Fresher", Comment: "Lỗi Login (New)", Hours: "2" },
];
const columnNames = ["Activity", "Project", "Comment", "Hours", "Action"];
const totalHours = dataTime.reduce((acc, current) => acc + parseInt(current.Hours), 0);

const newData = {
  Activity: "Today",
  Project: "",
  Comment: "",
  Hours: totalHours.toString(),
};

const dataTable = [newData, ...dataTime];

const SpentTime: React.FC = () => {
  const { isEditMyPage, removeBlock } = useGlobalStore((state) => ({
    isEditMyPage: state.isEditMyPage,
    removeBlock: state.removeBlock,
  }));
  const handleClose = () => {
    const blockId = optionBlockMyPage.find((block) => block.title === "Spent time")?.id || "";
    removeBlockFromBoardSections({
      blockId: blockId,
    });
    removeBlock(blockId);
  };
  return (
    <div className=" flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <Link className="text-ocean-blue font-semibold	hover:underline " to="/time_entries">
            Spent Time
          </Link>
          <p className="text-16 text-mouse-gray font-medium">(last 7 days)</p>
        </div>
        {isEditMyPage && <img className="w-fit h-fit mr-3 cursor-pointer" onClick={() => handleClose()} src={CloseImg} alt="closeButton" />}
      </div>
      <div className="flex justify-between">
        <p className="text-mouse-gray font-semibold	">Total Time: {totalHours}.00</p>
        <Link className="flex	min-w-20 hover:underline" to="/time_entries/new">
          <img className="mr-1 w-fit h-fit" src={IconAdd} alt="Add" /> <p className="text-xs">log time</p>
        </Link>
      </div>
      <Table className="bg-slate-500 min-w-full " columnNames={columnNames} dataTable={dataTable} />
    </div>
  );
};

export default SpentTime;

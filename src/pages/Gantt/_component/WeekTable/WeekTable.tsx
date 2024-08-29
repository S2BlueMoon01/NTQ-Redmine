import React from "react";

const WeekTable: React.FC<{ week: number }> = ({ week }) => {
  return (
    <div className="border h-full">
      <div className="text-center">{week}</div>
      <div className="flex h-full">
        <div className="w-4 border">M</div>
        <div className="w-4 border">T</div>
        <div className="w-4 border">W</div>
        <div className="w-4 border">T</div>
        <div className="w-4 border">F</div>
        <div className="w-4 border bg-[#eeeeee]">S</div>
        <div className="w-4 border bg-[#eeeeee]">S</div>
      </div>
    </div>
  );
};

export default WeekTable;

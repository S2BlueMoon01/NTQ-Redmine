import React, { useState } from "react";
import ArrowCollapsed from "~/assets/images/arrow_collapsed.png";
import ArrowExpanded from "~/assets/images/arrow_expanded.png";
import { Button } from "~/components/Button/Button";

import Select from "../Select";

const Option = () => {
  const [isDragDown, setIsDragDown] = useState(true);
  const [availableColumns, setAvailableColumns] = useState([
    "Product Category",
    "Target",
    "Similar",
    "Cause",
    "Solution",
    "Process",
    "From Customer",
    "Version",
    "FunctionID",
    "Bug Type",
    "Severity",
    "TestCaseID",
    "Purpose",
    "Department",
    "Duplicate issue",
    "Tested OK",
    "QnA Related",
    "Difficulty",
    "Test on staging OK",
    "Defect Origin",
    "QC Activity",
    "Defect Type",
    "Cause Category",
    "Main PIC",
    "Reviewer",
    "Defect Author",
    "Release Date",
    "Merge to CR",
    "Customer",
    "Expected Revenue ($)",
    "% Success",
    "Sale",
    "Why not find out?",
    "Next Due Date",
    "Next Action",
    "Builded",
    "Current State",
    "Test checklist",
    "Reproduce?",
    "After Refactor",
    "Swat",
    "Test Environment",
    "Late Release",
    "Release Note",
    "Dev_ Self Tested OK?",
    "Contract Type",
    "Project Line",
    "Business Domain",
    "Technology",
    "Project Size (MM)",
    "Team size (MM)",
    "Is Degrade?",
    "Cause (Lost/Closed/Pending)",
    "New customer?",
    "Reopen count",
    "New customer info",
    "Customer Type",
    "PIC OS",
    "Đánh giá của AM",
    "Đánh giá của OS",
    "Market",
    "Certainty",
    "Opp's Type",
    "Service Offering",
    "Release OK",
  ]);

  const [middleArray, setMiddleArray] = useState<string[]>([]);

  const [selectedColumns, setSelectedColumns] = useState(["Project", "Date", "User", "Activity", "Issue", "Comment", "Hours"]);

  const handleClickDragDown = () => {
    setIsDragDown((isDragDown) => !isDragDown);
  };

  const handleClickItem = (nameRow: string, nameColum: string) => {
    if (nameColum === "available") {
      const row = availableColumns.find((option) => {
        return option === nameRow;
      });
      if (row) {
        const newAvailable = availableColumns.filter((item) => item !== nameRow);
        const newSelect = [...selectedColumns, row];
        setAvailableColumns(newAvailable);
        setSelectedColumns(newSelect);
      }
    } else if (nameColum === "selected") {
      const row = selectedColumns.find((option) => {
        return option === nameRow;
      });
      if (row) {
        const newSelect = selectedColumns.filter((item) => item !== nameRow);
        const newAvailable = [...availableColumns, row];
        setAvailableColumns(newAvailable);
        setSelectedColumns(newSelect);
      }
    }
  };

  const handleMultiSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const options = event.target.options;
    const selectedValues: string[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setMiddleArray(selectedValues);
  };

  const moveLeft = () => {
    if (middleArray.length > 0) {
      const newSelectedColumns = [...selectedColumns, ...middleArray];
      const newAvailableColumns = availableColumns.filter((item) => !middleArray.includes(item));
      setAvailableColumns(newAvailableColumns);
      setSelectedColumns(newSelectedColumns);
      setMiddleArray([]);
    }
  };

  const moveRight = () => {
    if (middleArray.length > 0) {
      const newAvailableColumns = [...availableColumns, ...middleArray];
      const newSelectedColumns = selectedColumns.filter((item) => !middleArray.includes(item));
      setAvailableColumns(newAvailableColumns);
      setSelectedColumns(newSelectedColumns);
      setMiddleArray([]);
    }
  };

  const moveUp = () => {
    const copySelectedColumns = selectedColumns;
    middleArray.map((item) => {
      const index = copySelectedColumns.indexOf(item);
      if (index !== 0) {
        const move = copySelectedColumns.splice(index, 1)[0];
        copySelectedColumns.splice(index - 1, 0, move);
        setSelectedColumns(copySelectedColumns);
      }
    });
    setMiddleArray([]);
  };

  const moveDown = () => {
    const copySelectedColumns = selectedColumns;
    middleArray.map((item) => {
      const index = copySelectedColumns.indexOf(item);
      if (index !== selectedColumns.length - 1) {
        const move = copySelectedColumns.splice(index, 1)[0];
        copySelectedColumns.splice(index + 1, 0, move);
        setSelectedColumns(copySelectedColumns);
      }
    });
    setMiddleArray([]);
  };

  const moveTop = () => {
    const copySelectedColumns = selectedColumns;
    middleArray.reverse();

    middleArray.map((item) => {
      const index = copySelectedColumns.indexOf(item);
      if (index !== 0) {
        const move = copySelectedColumns.splice(index, 1)[0];
        copySelectedColumns.unshift(move);
        setSelectedColumns(copySelectedColumns);
      }
    });
    setMiddleArray([]);
  };

  const moveBottom = () => {
    const copySelectedColumns = selectedColumns;
    middleArray.map((item) => {
      const index = copySelectedColumns.indexOf(item);
      if (index !== selectedColumns.length - 1) {
        const move = copySelectedColumns.splice(index, 1)[0];
        copySelectedColumns.push(move);
        setSelectedColumns(copySelectedColumns);
      }
    });
    setMiddleArray([]);
  };

  return (
    <>
      <div className="relative pb-2">
        <hr />
        <div className="flex items-center px-1 absolute top-[-8px] left-3 bg-[#fff] cursor-pointer" onClick={handleClickDragDown}>
          <div className="text-gray-700">
            <img src={isDragDown ? ArrowExpanded : ArrowCollapsed} alt="icon expend" />
          </div>

          <span className="text-[10.8px] text-gray-rain">Options</span>
        </div>
      </div>
      <div className="flex items-center mt-1 ml-4">
        <span className="text-gray-rain text-[10.8px] mr-1">Columns</span>
        <div className="flex flex-col">
          <div className="text-gray-rain text-[10.8px] inline-block">Available Columns</div>
          <Select size={10} className="h-full w-[150px] text-[13.3px] m-0" multiple onChange={(e) => handleMultiSelect(e)}>
            {availableColumns.map((option) => (
              <option key={option} value={option} className="h-[18px] pb-[1px] pl-0.5" onDoubleClick={() => handleClickItem(option, "available")}>
                {option}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex flex-col gap-[2px]">
          <Button className="w-8" onClick={moveLeft}>
            →
          </Button>
          <Button className="w-8" onClick={moveRight}>
            ←
          </Button>
        </div>
        <div className="flex flex-col ml-1">
          <div className="text-gray-rain text-[10.8px] inline-block">Selected Columns</div>
          <Select size={10} className="h-full w-[150px] text-[13.3px] m-0" multiple onChange={(e) => handleMultiSelect(e)}>
            {selectedColumns.map((option) => (
              <option key={option} value={option} className="h-[18px] pb-[1px] pl-0.5" onDoubleClick={() => handleClickItem(option, "selected")}>
                {option}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex flex-col gap-[2px]">
          <Button className="w-8" onClick={moveTop}>
            ⇈
          </Button>
          <Button className="w-8" onClick={moveUp}>
            ↑
          </Button>
          <Button className="w-8" onClick={moveDown}>
            ↓
          </Button>
          <Button className="w-8" onClick={moveBottom}>
            ⇊
          </Button>
        </div>
      </div>
    </>
  );
};

export default Option;

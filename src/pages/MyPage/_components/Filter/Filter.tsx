import React, { useState } from "react";
import Select from "~/components/Select";
import Input from "~/components/Input";

const Filter = () => {
  const fakeData = [
    {
      title: "Status",
      sortBy: [
        { value: "is not1", label: "is not1" },
        { value: "is1", label: "is1" },
      ],
      type: "select",
      filerOptions: [
        { value: "is not", label: "is not" },
        { value: "fake", label: "hahah" },
      ],
    },
    {
      title: "Start date",
      sortBy: [
        { value: "is not2", label: "is not2" },
        { value: "is2", label: "is2" },
      ],
      type: "date",
    },
    {
      title: "Copied to",
      sortBy: [
        { value: "is not3", label: "is not3" },
        { value: "is3", label: "is3" },
      ],
      type: "input",
    },
  ];

  const [isDragDown, setIsDragDown] = useState(true);

  const handleClickDragDown = () => {
    setIsDragDown((isDragDown) => !isDragDown);
    console.log("handleClickDragDown");
  };

  fakeData.map((item) => item.sortBy.map((option) => console.log(option.value)));

  return (
    <>
      <div className="relative pb-2">
        <hr />
        <div className="flex items-center px-1 gap-1 absolute top-[-10px] left-3 bg-[#fff]">
          <div onClick={handleClickDragDown} className="text-gray-700">
            {">"}
          </div>
          <span className="text-sm text-gray-700">Filters</span>
        </div>
      </div>
      {isDragDown && (
        <div className="flex justify-between pr-3">
          <div className="gap-2 min-w-16 w-[70%]">
            {fakeData.map((item) => (
              <div key={item.title} className="flex">
                <div className="flex items-center gap-2 w-72">
                  <input type="checkbox" className="" />
                  <label htmlFor="assignee-role" className="text-gray-700 text-sm">
                    {item.title}
                  </label>
                </div>
                <div className="w-80">
                  <Select className="bg-transparent border ">
                    {item.sortBy.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="flex items-center">
                  {item.type === "input" && <Input type="text" className="border" />}
                  {item.type === "select" && (
                    <Select className="bg-transparent border">
                      {item.filerOptions?.map((filterOption) => (
                        <option key={filterOption.value} value={filterOption.value}>
                          {filterOption.label}
                        </option>
                      ))}
                    </Select>
                  )}
                  {item.type === "date" && <Input type="text" className="border w-" />}
                  <img src="" alt="" className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
          <div>
            <span className="text-sm text-gray-700">Add filter </span>
            <Select className="bg-transparent border ">
              <option value="Developer">Developer</option>
            </Select>
          </div>
        </div>
      )}
    </>
  );
};

export default Filter;

import React, { useState } from "react";
import Select from "~/components/Select";
import Input from "~/components/Input";
import TogglePlus from "~/assets/images/bullet_toggle_plus.png";
import ArrowCollapsed from "~/assets/images/arrow_collapsed.png";
import ArrowExpanded from "~/assets/images/arrow_expanded.png";
import DatePickerCustom from "~/components/DatePicker";

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
        { value: "fale2", label: "hahahd" },
        { value: "is notx", label: "is noxt" },
        { value: "faske", label: "hahash" },
        { value: "falwe2", label: "hahawhd" },
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
  const [size, setSize] = useState<number | undefined>(undefined);

  const handleAddSize = () => {
    if (size === 0) {
      setSize(5);
    } else {
      setSize(0);
    }
  };

  const handleClickDragDown = () => {
    setIsDragDown((isDragDown) => !isDragDown);
  };

  fakeData.map((item) => item.sortBy.map((option) => console.log(option.value)));

  return (
    <>
      <div className="relative pb-2">
        <hr />
        <div className="flex items-center px-1 absolute top-[-8px] left-3 bg-[#fff] cursor-pointer" onClick={handleClickDragDown}>
          <div className="text-gray-700">
            <img src={isDragDown ? ArrowExpanded : ArrowCollapsed} alt="" />
          </div>

          <span className="text-[10.8px] text-gray-rain">Filters</span>
        </div>
      </div>
      {isDragDown && (
        <div className="flex justify-between pr-3">
          <div className="gap-2 min-w-16 w-[70%]">
            {fakeData.map((item) => (
              <div key={item.title} className="flex items-center">
                <div className="flex items-center gap-2 w-72">
                  <input type="checkbox" className="" />
                  <label htmlFor="assignee-role" className=" text-[10.8px]">
                    {item.title}
                  </label>
                </div>
                <div className="w-80">
                  <Select className="bg-[#efefef] border text-[12px]">
                    {item.sortBy.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="flex items-center">
                  {item.type === "input" && (
                    <>
                      <Input type="text" className="border" />
                    </>
                  )}
                  {item.type === "select" && (
                    <>
                      <Select className="bg-transparent border h-full bg-[#efefef] pl-0" size={size}>
                        {item.filerOptions?.map((filterOption) => (
                          <option key={filterOption.value} value={filterOption.value}>
                            {filterOption.label}
                          </option>
                        ))}
                      </Select>
                      <img src={TogglePlus} alt="TogglePlus" className="cursor-pointer" onClick={handleAddSize} />
                    </>
                  )}
                  {item.type === "date" && (
                    <>
                      <DatePickerCustom className="pl-1" />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div>
            <span className="text-[10.8px] text-gray-rain">Add filter </span>
            <Select className="border ">
              <option value="Developer">Developer</option>
            </Select>
          </div>
        </div>
      )}
    </>
  );
};

export default Filter;

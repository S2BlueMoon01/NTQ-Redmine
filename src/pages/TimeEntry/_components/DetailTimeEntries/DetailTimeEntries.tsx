import React, { useState } from "react";
import ApplyImg from "~/assets/images/apply-img.png";
import { BeatLoader } from "react-spinners";

interface ListDataTime {
  id: number;
  project: string;
  date: string;
  user: string;
  activity: string;
  comment: string | undefined;
  hours: number;
  [key: string]: string | number | undefined;
}
interface PropsComponent {
  loading?: boolean;
  dataTable?: ListDataTime[];
  isCheckbox?: boolean;
}

const columnNames = ["project", "date", "user", "activity", "comment", "hours", "issues"];

const DetailTimeEntries: React.FC<PropsComponent> = ({ dataTable = [], loading = true }) => {
  const [checkList, setCheckList] = useState<number[]>([]);
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const totalHours = dataTable && dataTable.reduce((acc, current) => acc + current.hours, 0).toFixed(2);

  const handleChecked = (index: number) => {
    if (checkList.includes(index)) {
      setCheckList((prev) => prev.filter((item) => item !== index));
    } else {
      setCheckList((prev) => [...prev, index]);
    }
  };

  const handleCheckboxChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCheckList((prev) => [...prev, index]);
    } else {
      setCheckList((prev) => prev.filter((item) => item !== index));
    }
  };

  const handleCheckAll = () => {
    if (isAllChecked) {
      setCheckList([]);
    } else {
      const allIndexes = dataTable.map((_, index) => index);
      setCheckList(allIndexes);
    }
    setIsAllChecked(!isAllChecked);
  };

  return (
    <div className="flex flex-col gap-3">
      <p className=" font-bold text-mouse-gray">Total time: {totalHours ? totalHours : 0} hours</p>
      <table className="table-auto text-xs text-mouse-gray">
        <thead className="bg-gray-200   ">
          <tr className="h-7">
            <th
              className="text-center capitalize  border border-solid border-gray-300 border-b-slate-600 text-gray-600 px-5 tracking-wider cursor-pointer"
              onClick={handleCheckAll}
            >
              <img src={ApplyImg} alt="Checkbox" />
            </th>
            {columnNames.map((columnName, index) => (
              <th
                className={`text-center capitalize  border border-solid border-gray-300 border-b-slate-600 text-gray-600 px-5 tracking-wider w-auto ${index === 1 || index === 3 ? "w-auto " : "w-auto"}`}
                key={columnName}
              >
                {columnName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading && (
            <tr className="h-7">
              <td className="text-center w-full" colSpan={columnNames.length + 1}>
                <div className="flex justify-center">
                  <BeatLoader color="#169" size={5} />
                </div>
              </td>
            </tr>
          )}
          {dataTable.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => handleChecked(rowIndex)}
              className={rowIndex % 2 === 0 ? "bg-gray-100 hover:bg-yellow-100 h-7" : "hover:bg-yellow-100 h-7"}
            >
              <td className="text-center">
                <input type="checkbox" checked={checkList.includes(rowIndex)} onChange={handleCheckboxChange(rowIndex)} />
              </td>
              {columnNames.map((columnName) => {
                return (
                  <td key={columnName} className="text-center whitespace-nowrap px-3">
                    {row[columnName]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-10 text-ocean-blue">
        (1-{dataTable.length}/{dataTable.length})
      </p>
    </div>
  );
};

export default DetailTimeEntries;

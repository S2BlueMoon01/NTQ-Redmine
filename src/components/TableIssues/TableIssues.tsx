import React, { useState } from "react";
import { BeatLoader } from "react-spinners";
import Dialog from "~/pages/MyPage/_components/Dialog";
import ApplyImg from "~/assets/images/apply-img.png";

interface PropsComponent {
  className?: string;
  columnNames: string[];
  loading?: boolean;
  dataTable?: { [key: string]: string | number | JSX.Element | undefined }[];
  isCheckbox?: boolean;
}

const TableIssues: React.FC<PropsComponent> = ({ className, columnNames = [], dataTable = [], loading = true, isCheckbox = false }) => {
  const [activeItem, setActiveItem] = useState<number>(1);
  const [checkList, setCheckList] = useState<number[]>([]);
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);

  const handleMouseDown = (index: number) => {
    setActiveItem(index);
  };

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
    <table className={`table-auto text-xs text-mouse-gray ${className}`}>
      <thead className="bg-gray-200   ">
        <tr className="h-7">
          {isCheckbox && (
            <>
              <th
                className="text-center capitalize  border border-solid border-gray-300 border-b-slate-600 text-gray-600 px-5 tracking-wider cursor-pointer"
                onClick={handleCheckAll}
              >
                <img src={ApplyImg} alt="Checkbox" />
              </th>
            </>
          )}
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
            <td className="text-center w-full" colSpan={isCheckbox ? columnNames.length + 1 : columnNames.length}>
              <div className="flex justify-center">
                <BeatLoader color="#169" size={5} />
              </div>
            </td>
          </tr>
        )}
        {dataTable.map((row, rowIndex) => (
          <tr
            key={rowIndex + 1}
            onClick={() => handleChecked(rowIndex)}
            className={rowIndex % 2 === 0 ? "bg-gray-100 hover:bg-yellow-100 h-7" : "hover:bg-yellow-100 h-7"}
          >
            {isCheckbox && (
              <td className="text-center">
                <input type="checkbox" checked={checkList.includes(rowIndex)} onChange={handleCheckboxChange(rowIndex)} />
              </td>
            )}
            {columnNames.map((columnName) => {
              const id = row["#"];
              const columnTable = columnName.replace(/\s+/g, "");
              return (
                <td
                  key={columnName}
                  className={columnName === "tracker" ? "text-center whitespace-nowrap px-3" : "hover:underline text-center whitespace-nowrap px-3"}
                >
                  {row[columnTable] !== undefined &&
                    (typeof id === "number" ? (
                      <Dialog issueId={id} content={row[columnTable] as string} handleClick={handleMouseDown} ZIndex={activeItem === id ? 40 : 30} />
                    ) : (
                      row[columnTable]
                    ))}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableIssues;

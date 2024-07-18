import React from "react";
import EditImg from "~/assets/images/edit-img.png";
import DeleteImg from "~/assets/images/delete-img.png";

type PropsComponent = {
  className?: string;
  columnNames: string[];
  dataTable: { [key: string]: string | number }[];
  action?: boolean;
};

const Table: React.FC<PropsComponent> = ({ className, columnNames = [], dataTable = [], action = false }) => {
  return (
    <table className={`table-auto text-mouse-gray ${className}`}>
      <thead className="bg-gray-200   ">
        <tr className="h-7">
          {columnNames.map((columnName, index) => (
            <th
              className={`text-center text-xs border border-solid border-gray-300 border-b-slate-600 text-gray-600 px-5 tracking-wider w-auto ${index === 1 || index === 3 ? "w-auto " : "w-auto"}`}
              key={columnName}
            >
              {columnName}
            </th>
          ))}
          {action && (
            <th className="text-center text-xs border border-solid border-gray-300 border-b-slate-600 text-gray-600 font-semibold tracking-wider w-auto">
              Action
            </th>
          )}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {dataTable.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-yellow-100 h-7">
            {columnNames.map((columnName, colIndex) => (
              <td key={colIndex} className="text-center text-sm border border-solid border-gray-300 whitespace-nowrap ">
                {row[columnName]}
              </td>
            ))}
            {action && (
              <td className=" whitespace-nowrap border border-solid border-gray-300">
                {rowIndex !== 0 && (
                  <div className="flex text-center text-sm justify-center">
                    <img className="mr-1" src={EditImg} onClick={() => alert("Edit")} />
                    <img className="mr-1" src={DeleteImg} onClick={() => alert("Edit")} />
                  </div>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

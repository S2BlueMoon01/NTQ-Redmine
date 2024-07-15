import React from "react";

type PropsComponent = {
  className?: string;
  columnNames: string[];
  dataTable: { [key: string]: string | number }[];
};

const Table: React.FC<PropsComponent> = ({ className, columnNames = [], dataTable = [] }) => {
  return (
    <table className={`table-auto text-mouse-gray ${className}`}>
      <thead className="bg-gray-200 black">
        <tr className="h-7">
          {columnNames.map((columnName, index) => (
            <th
              className={`text-center text-xs border border-solid border-gray-300 border-b-slate-600 text-gray-600 tracking-wider w-auto ${index === 1 || index === 3 ? "w-auto " : "w-auto"}`}
              key={columnName}
            >
              {columnName}
            </th>
          ))}
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
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

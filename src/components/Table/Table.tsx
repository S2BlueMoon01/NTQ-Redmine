import React from "react";

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
              className={`text-center text-xs border border-solid border-gray-300 border-b-slate-600 text-gray-600 tracking-wider w-auto ${index === 1 || index === 3 ? "w-auto " : "w-auto"}`}
              key={columnName}
            >
              {columnName}
            </th>
          ))}
          {action && (
            <th className="text-center text-xs border border-solid border-gray-300 border-b-slate-600 text-gray-600 tracking-wider w-auto">Action</th>
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
              <td className="text-center text-sm border border-solid border-gray-300 whitespace-nowrap ">
                {rowIndex !== 0 && (
                  <>
                    <button onClick={() => alert("Edit")}>Edit</button>
                    <button className="ml-2" onClick={() => alert("Delete")}>
                      Delete
                    </button>
                  </>
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

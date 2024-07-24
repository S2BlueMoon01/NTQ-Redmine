import React from "react";
import { BeatLoader } from "react-spinners";
import DeleteImg from "~/assets/images/delete-img.png";
import EditImg from "~/assets/images/edit-img.png";
import Dialog from "~/pages/MyPage/_components/Dialog";

interface PropsComponent {
  className?: string;
  columnNames: string[];
  loading?: boolean;
  dataTable?: { [key: string]: string | number | undefined }[];
}

const Table: React.FC<PropsComponent> = ({ className, columnNames = [], dataTable = [], loading = true }) => {
  return (
    <table className={`table-auto text-xs text-mouse-gray ${className}`}>
      <thead className="bg-gray-200   ">
        <tr className="h-7">
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
            <td className="text-center w-full" colSpan={columnNames.length}>
              <div className="flex justify-center">
                <BeatLoader color="#169" size={5} />
              </div>
            </td>
          </tr>
        )}
        {dataTable.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-yellow-100 h-7">
            {columnNames.map((columnName) => {
              const id = row["#"];
              return (
                <td key={columnName} className="text-center whitespace-nowrap px-3">
                  {columnName === "Action" ? (
                    <div className="flex text-center justify-center">
                      <img className="mr-1 cursor-pointer" src={EditImg} onClick={() => alert("Edit")} />
                      <img className="mr-1 cursor-pointer" src={DeleteImg} onClick={() => alert("Delete")} />
                    </div>
                  ) : (
                    row[columnName] !== undefined && (typeof id === "number" ? <Dialog issueId={id} content={row[columnName] as string} /> : null)
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

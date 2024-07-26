import React, { useEffect, useState } from "react";
import ApplyImg from "~/assets/images/apply-img.png";
import { BeatLoader } from "react-spinners";
import timeEntriesApi from "~/apis/timeEntries.api";
import moment from "moment";
import issuesApi from "~/apis/issue.api";

interface ListDataTable {
  id: number;
  project: string | JSX.Element;
  date: string;
  user: string | JSX.Element;
  activity: string;
  comment: string | undefined;
  hours: number;
  issues: string | JSX.Element;
  [key: string]: string | number | JSX.Element | undefined;
}

const columnNames = ["project", "date", "user", "issues", "activity", "comment", "hours"];

const DetailTimeEntries = () => {
  const [checkList, setCheckList] = useState<number[]>([]);
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [listDataTableTime, setListDataTable] = useState<ListDataTable[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const totalHours = listDataTableTime && listDataTableTime.reduce((acc, current) => acc + current.hours, 0).toFixed(2);

  const fetchTimeEntries = async () => {
    try {
      const responseTime = await timeEntriesApi.listTimeEntries();
      const responseIssues = await issuesApi.listIssues();

      const listDataTable =
        responseTime.data?.time_entries &&
        responseTime.data?.time_entries.map((time) => {
          const issues = responseIssues?.data?.issues.find((issue) => issue?.id === time?.issue?.id);
          const dataIssuesTable = issues ? (
            <span>
              <a href={`/tracker/${issues.id}`} className="text-ocean-blue hover:underline" target="_blank" rel="noopener noreferrer">
                {issues.tracker.name} #{issues.id}
              </a>{" "}
              {issues.subject}
            </span>
          ) : (
            ""
          );
          const project = time.project && (
            <span>
              <a href="" className="text-ocean-blue hover:underline" target="_blank" rel="noopener noreferrer">
                {time.project.name}
              </a>
            </span>
          );
          const userName = time.project && (
            <span>
              <a href="" className="text-ocean-blue hover:underline" target="_blank" rel="noopener noreferrer">
                {time.user.name}
              </a>
            </span>
          );
          return {
            id: time?.id,
            project: project,
            date: moment(time.created_on).format("MM/DD/YYYY"),
            user: userName,
            activity: time.activity.name,
            comment: time.comments,
            hours: time.hours,
            issues: dataIssuesTable,
          };
        });
      console.log(listDataTable);
      setListDataTable(listDataTable);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeEntries();
  }, []);

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
      const allIndexes = listDataTableTime.map((_, index) => index);
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
                className={`text-center capitalize  border border-solid border-gray-300 border-b-slate-600 text-ocean-blue  px-5 tracking-wider w-auto ${index === 1 || index === 3 ? "w-auto " : "w-auto"}`}
                key={columnName}
              >
                <a className="hover:underline" href="">
                  {columnName}
                </a>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {isLoading && (
            <tr className="h-7">
              <td className="text-center w-full" colSpan={columnNames.length + 1}>
                <div className="flex justify-center">
                  <BeatLoader color="#169" size={5} />
                </div>
              </td>
            </tr>
          )}
          {listDataTableTime.map((item, rowIndex) => (
            <tr
              key={item.id}
              onClick={() => handleChecked(rowIndex)}
              className={rowIndex % 2 === 0 ? "bg-gray-100 hover:bg-yellow-100 h-7" : "hover:bg-yellow-100 h-7"}
            >
              <td className="text-center">
                <input type="checkbox" checked={checkList.includes(rowIndex)} onChange={handleCheckboxChange(rowIndex)} />
              </td>
              {columnNames.map((columnName) => {
                return (
                  <td key={columnName} className="text-center whitespace-nowrap px-3">
                    {item[columnName]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-10 text-ocean-blue">
        (1-{listDataTableTime.length}/{listDataTableTime.length})
      </p>
    </div>
  );
};

export default DetailTimeEntries;

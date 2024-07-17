import React from "react";
import "./Calendar.css";
import ArrowRightIcon from "~/assets/images/arrow_right.png";
import Card from "~/pages/MyPage/_components/Card/Card";
import { getWeekNumber, arrangeIssue, getWeekDates, getDay } from "~/utils/utils";
import { Issue } from "~/types/issue.type";

const Calendar = () => {
  const week = getWeekNumber(new Date())[1];

  const apiResponse: Issue[] = [
    {
      id: 122640,
      project: {
        id: 323,
        name: "[Fresher]_ ReactJS Fresher",
      },
      tracker: {
        id: 4,
        name: "Task",
      },
      status: {
        id: 9,
        name: "Build",
      },
      priority: {
        id: 3,
        name: "High",
      },
      author: {
        id: 2799,
        name: "Viet (Internship) Nguyen Van",
      },
      assigned_to: {
        id: 2799,
        name: "Viet (Internship) Nguyen Van",
      },
      subject: "task abcádf",
      description: "fix bug",
      start_date: "2024-07-16",
      due_date: "2024-07-20",
      done_ratio: 10,
      estimated_hours: 88.0,
      custom_fields: [
        {
          id: 13,
          name: "Severity",
          value: "Cosmetic",
        },
      ],
      created_on: "2024-07-09T01:56:21Z",
      updated_on: "2024-07-09T01:56:21Z",
    },
    {
      id: 122641,
      project: {
        id: 323,
        name: "[Fresher]_ ReactJS Fresher",
      },
      tracker: {
        id: 4,
        name: "Task",
      },
      status: {
        id: 9,
        name: "Build",
      },
      priority: {
        id: 3,
        name: "High",
      },
      author: {
        id: 2799,
        name: "Viet (Internship) Nguyen Van",
      },
      assigned_to: {
        id: 2799,
        name: "Viet (Internship) Nguyen Van",
      },
      subject: "task abcádf",
      description: "fix bug",
      start_date: "2024-07-15",
      due_date: "2024-07-20",
      done_ratio: 10,
      estimated_hours: 88.0,
      custom_fields: [
        {
          id: 13,
          name: "Severity",
          value: "Cosmetic",
        },
      ],
      created_on: "2024-07-09T01:56:21Z",
      updated_on: "2024-07-09T01:56:21Z",
    },
    {
      id: 122642,
      project: {
        id: 323,
        name: "[Fresher]_ ReactJS Fresher",
      },
      tracker: {
        id: 4,
        name: "Task",
      },
      status: {
        id: 9,
        name: "Build",
      },
      priority: {
        id: 3,
        name: "High",
      },
      author: {
        id: 2799,
        name: "Viet (Internship) Nguyen Van",
      },
      assigned_to: {
        id: 2799,
        name: "Viet (Internship) Nguyen Van",
      },
      subject: "task abcádf",
      description: "fix bug",
      start_date: "2024-07-15",
      due_date: "2024-07-20",
      done_ratio: 10,
      estimated_hours: 88.0,
      custom_fields: [
        {
          id: 13,
          name: "Severity",
          value: "Cosmetic",
        },
      ],
      created_on: "2024-07-09T01:56:21Z",
      updated_on: "2024-07-09T01:56:21Z",
    },
  ];

  const daysOfWeek = getWeekDates().map((d) => d.toISOString().split("T")[0]);

  const mainArrays = arrangeIssue(apiResponse, daysOfWeek);

  return (
    <>
      <h2 className="text-base text-[#555] font-bold">Calendar</h2>
      <table className="w-full border-collapse table-fixed">
        <thead>
          <tr>
            <th className="w-[22px] p-1"></th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
            <th>Sunday</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-xs w-[22px] p-1 text-[#505050] ">{week}</td>
            {mainArrays.map((item) => {
              return (
                <td
                  key={Object.keys(item).toString()}
                  className={`${getDay() === Object.keys(item).toString() ? "bg-[#ffffdd]" : ""} hover:bg-[#ffffdd] relative pt-8`}
                >
                  <div className="text-right text-[#505050] absolute top-1 right-1">{Object.keys(item).toString()}</div>
                  {item[Object.keys(item)[0]].map((issue) => (
                    <div key={issue.id} className="py-1">
                      <div className="flex flex-wrap p-[6px] w-full text-[10.8px] text-[#505050] bg-[#ffffdd] border relative card">
                        {issue.project.name}-
                        <span>
                          <img src={ArrowRightIcon} alt="ArrowRightIcon" />
                        </span>
                        <a href="#!" className="text-[#116699] ">
                          {issue.tracker.name} #{issue.id}:
                        </a>
                        {issue.subject}
                        <Card issue={issue} />
                      </div>
                    </div>
                  ))}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Calendar;

import React from "react";
import WeekTable from "../WeekTable";

const DataTable = () => {
  const weeks = [32, 33, 34, 35, 36, 37, 38, 39, 40];
  const today = new Date();

  // Lấy năm hiện tại
  const year = today.getFullYear();

  // Lấy tháng hiện tại (lưu ý: tháng trong JavaScript được đánh số từ 0-11, nên cần cộng thêm 1)
  const month = String(today.getMonth() + 1); // Đảm bảo tháng luôn có hai chữ số

  // Kết hợp năm và tháng dưới định dạng YYYY-MM
  const formattedDate = `${year}-${month}`;

  console.log(formattedDate);

  const fakeData = [
    {
      issue: {
        id: 123059,
        project: {
          id: 323,
          name: "[Fresher]_ ReactJS Fresher",
        },
        tracker: {
          id: 1,
          name: "Bug",
        },
        status: {
          id: 1,
          name: "New",
        },
        priority: {
          id: 3,
          name: "High",
        },
        author: {
          id: 2803,
          name: "Duc (Internship) Nguyen Minh",
        },
        subject: "high",
        description: "",
        start_date: "2024-08-04",
        due_date: "2024-08-15",
        done_ratio: 70,
        spent_hours: 0.0,
        custom_fields: [
          {
            id: 12,
            name: "Bug Type",
            value: "Others",
          },
          {
            id: 13,
            name: "Severity",
            value: "Cosmetic",
          },
          {
            id: 23,
            name: "QC Activity",
            value: "Other Test",
          },
          {
            id: 25,
            name: "Cause Category",
            multiple: true,
            value: ["9. Other"],
          },
          {
            id: 62,
            name: "Is Degrade?",
            value: "No",
          },
          {
            id: 63,
            name: "Reopen counter",
            value: "0",
          },
        ],
        created_on: "2024-08-04T10:02:34Z",
        updated_on: "2024-08-13T03:24:12Z",
      },
    },
    {
      issue: {
        id: 123062,
        project: {
          id: 323,
          name: "[Fresher]_ ReactJS Fresher",
        },
        tracker: {
          id: 1,
          name: "Bug",
        },
        status: {
          id: 1,
          name: "New",
        },
        priority: {
          id: 2,
          name: "Normal",
        },
        author: {
          id: 2803,
          name: "Duc (Internship) Nguyen Minh",
        },
        subject: "Subject changed hehe",
        description: "",
        start_date: "2024-08-04",
        due_date: "2024-08-04",
        done_ratio: 0,
        spent_hours: 0.0,
        custom_fields: [
          {
            id: 12,
            name: "Bug Type",
            value: "Others",
          },
          {
            id: 13,
            name: "Severity",
            value: "Cosmetic",
          },
          {
            id: 23,
            name: "QC Activity",
            value: "Other Test",
          },
          {
            id: 25,
            name: "Cause Category",
            multiple: true,
            value: ["9. Other"],
          },
          {
            id: 62,
            name: "Is Degrade?",
            value: "No",
          },
          {
            id: 63,
            name: "Reopen counter",
            value: "0",
          },
        ],
        created_on: "2024-08-04T13:37:16Z",
        updated_on: "2024-08-14T07:33:52Z",
      },
    },
  ];

  return (
    <div className="flex h-full">
      {weeks.map((week) => (
        <WeekTable week={week} />
      ))}
    </div>
  );
};

export default DataTable;

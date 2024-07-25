import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { cn } from "~/utils/utils";

const Navbar = () => {
  const [listValueNavbar, setListValueNavbar] = useState([
    {
      name: "Overview",
      path: "#/",
      selected: false,
      isExternal: true,
    },
    {
      name: "Activity",
      path: "#/activity",
      selected: false,
    },
    {
      name: "Roadmap",
      path: "#/roadmap",
      selected: false,
    },
    {
      name: "Issues",
      path: "#/issues",
      selected: false,
    },
    {
      name: "New issue",
      path: "#/issues/new",
      selected: false,
    },
    {
      name: "Gantt",
      path: "#/issues/gantt",
      selected: false,
    },
    {
      name: "Calendar",
      path: "#/issues/calendar",
      selected: false,
    },
    {
      name: "Documents",
      path: "#/documents",
      selected: false,
    },
    {
      name: "Wiki",
      path: "#/wiki",
      selected: false,
    },
    {
      name: "Files",
      path: "#/files",
      selected: false,
    },
    {
      name: "Settings",
      path: "#/settings",
      selected: false,
    },
  ]);

  const handleClickNavbar = (itemName: string) => {
    console.log("itemName", itemName);
    setListValueNavbar((prevState) => prevState.map((item) => (item.name === itemName ? { ...item, selected: true } : { ...item, selected: false })));
    console.log("listValueNavbar", listValueNavbar);
  };

  return (
    <div>
      <ul className="flex gap-[1px] cursor-pointer pl-1 text-[#fff] text-xs font-bold">
        {listValueNavbar.length > 0 &&
          listValueNavbar.map((item) => (
            <li
              key={item.name}
              className={cn(`bg-[#507AAA] hover:underline py-1 px-2.5 ${item.selected ? "text-mouse-gray bg-[#eee]" : ""} `)}
              onClick={() => handleClickNavbar(item.name)}
            >
              <Link rel={item?.isExternal ? "noopener noreferrer" : ""} className="hover:underline " to={item.path}>
                {item.name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Navbar;

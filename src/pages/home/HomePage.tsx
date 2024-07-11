import React from "react";
import LatestProject from "~/assets/images/latest-projects.png";
import useScrollToTop from "~/hooks/useScrollToTop";

const HomePage = () => {
  useScrollToTop();
  return (
    <div className="p-2.5 pt-1">
      <h2 className="text-xl font-semibold pt-0.5 pr-3 mb-3 text-mouse-gray">Home</h2>
      <div className="flex">
        <div className="content-left w-3/6"></div>
        <div className="content-right w-3/6 border-solid border-inherit	border-2 p-2	">
          <div className="flex items-center mb-3">
            <img className="mr-1" src={LatestProject} alt="" />
            <p className="text-mouse-gray text-sm font-medium">Latest projects</p>
          </div>
          <div className="pl-10 my-3">
            <ul className="text-mouse-gray text-xs list-disc">
              <li>
                <a className="text-ocean-blue hover:underline " href="#">
                  [Fresher]_ ReactJS Fresher
                </a>{" "}
                (08/07/2024 09:16 AM)
              </li>
              <li>
                <a className="text-ocean-blue hover:underline" href="#">
                  Dentalflow_Sale&amp;MKT
                </a>{" "}
                (31/10/2022 10:16 AM)
                <p>Quản lý công việc team sale và Marketing</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

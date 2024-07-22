import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import projectsApi from "~/apis/projects.api";
import LatestProject from "~/assets/images/latest-projects.png";
import useScrollToTop from "~/hooks/useScrollToTop";
import { DataProject } from "~/types/project.type";

const HomePage = () => {
  const [listProject, setListProject] = useState<DataProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useScrollToTop();

  const fetchProject = async () => {
    try {
      const response = await projectsApi.getAllProjects();
      const listProjects = response.data.projects.map((project: DataProject) => {
        return {
          ...project,
          created_on: moment(project.created_on).format("MM/DD/YYYY hh:mm A"),
        };
      });

      setListProject(listProjects);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchProject();
  }, []);

  return (
    <div className="p-2.5 pt-1">
      <h2 className="text-xl font-semibold pt-0.5 pr-3 mb-3 text-mouse-gray">Home</h2>

      <div className="flex">
        <div className="content-left w-3/6"></div>
        <div className="content-right w-3/6 border-solid border-inherit	border-2 p-2	">
          <div className="flex items-center mb-3">
            <img className="mr-1" src={LatestProject} alt="logo" />
            <p className="text-mouse-gray text-sm font-medium">Latest projects</p>
          </div>
          <div className="pl-10 my-3">
            <ul className="text-mouse-gray text-xs list-disc">
              <SyncLoader loading={loading} color="#169" size={5} />
              {listProject && listProject.length > 0 ? (
                listProject.map((item) => {
                  return (
                    <li key={item.id}>
                      <Link className="text-ocean-blue hover:underline" to={`/projects/${item.identifier}`}>
                        {item.name}
                      </Link>{" "}
                      ({item.created_on})<p>{item.description}</p>
                    </li>
                  );
                })
              ) : (
                <></>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

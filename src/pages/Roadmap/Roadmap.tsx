import { Link, useParams } from "react-router-dom";
import IconAdd from "~/assets/images/icon-add.png";
import PackageImg from "~/assets/images/package-img.png";
import useScrollToTop from "~/hooks/useScrollToTop";
import ProgressBar from "./_components/ProgressBar";
import React, { useEffect, useState } from "react";
import versionsApi from "~/apis/versions.api";
import { Version } from "~/types/version.type";
import moment from "moment";
import { SyncLoader } from "react-spinners";
import issuesApi from "~/apis/issue.api";
import { Issue } from "~/types/issue.type";
import SideBar from "./_components/SideBar";
import { CheckBoxRoadMap } from "~/types/utils.type";

const Roadmap = () => {
  const [listVersionOfProject, setListVersionOfProject] = useState<Version[]>([]);
  const [listIssuesOfVersion, setListIssuesOfVersion] = useState<Issue[]>([]);
  const [isCheckedBoxRoadmap, setIsCheckedBoxRoadmap] = useState<CheckBoxRoadMap>({
    task: true,
    bug: false,
    showComplete: false,
  });
  const { id } = useParams();
  const currentDate = moment();
  useScrollToTop();

  const fetchIssuesOfVersion = async () => {
    try {
      const responseIssues = await issuesApi.listIssues({ project_id: Number(id), fixed_version_id: "*" });
      if (responseIssues?.data?.issues.length) {
        setListIssuesOfVersion(responseIssues?.data?.issues);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchVersionOfProject = async () => {
    try {
      const responseVersion = await versionsApi.getAllVersionOfProject({ idProject: Number(id) });
      const listData =
        responseVersion.data.versions &&
        responseVersion.data.versions.map((version) => {
          const issuesOfVersion = listIssuesOfVersion.filter((issue) => issue?.fixed_version?.id === version.id);
          const createdDate = moment(version.due_date, "YYYY-MM-DD");
          const difference = currentDate.diff(createdDate, "days");
          return {
            ...version,
            daysLate: difference,
            issues: issuesOfVersion,
          };
        });
      setListVersionOfProject(listData);
    } catch (e) {
      console.log(e);
    }
  };

  const handleApply = (data: CheckBoxRoadMap) => {
    setIsCheckedBoxRoadmap(data);
  };
  console.log(isCheckedBoxRoadmap);

  useEffect(() => {
    fetchIssuesOfVersion();
  }, []);

  useEffect(() => {
    if (listIssuesOfVersion.length > 0) {
      fetchVersionOfProject();
    }
  }, [listIssuesOfVersion]);

  return (
    <div className="flex min-h-84">
      <div className="flex flex-col gap-2.5 bg-white w-9/12 px-3 mt-3 pb-8 border border-solid ">
        <div className="flex justify-between items-center p-1.5">
          <h2 className="text-xl text-mouse-gray font-semibold">Roadmap</h2>
          <Link className="flex	min-w-20 hover:underline" to="/time_entries/new">
            <img className="mr-1 w-fit h-fit" src={IconAdd} alt="Add" /> <p className="text-xs">New version</p>
          </Link>
        </div>
        <div className="flex flex-col gap-1.5 text-sm">
          {listVersionOfProject.length ? (
            listVersionOfProject.map((version) => {
              if (version.status === "closed" && !isCheckedBoxRoadmap.showComplete) {
                return <></>;
              }
              return (
                <React.Fragment key={version.id}>
                  <Link className="flex gap-1	min-w-20 hover:underline items-center" to="" title="ds">
                    <img className="mr-1 w-fit h-fit" src={PackageImg} alt="package" />
                    <p className="text-base text-ocean-blue font-semibold">{version.name}</p>
                  </Link>
                  <p className="text-sm text-gray-700 flex gap-1">
                    {version.daysLate} days late <p className="text-xs">({version.due_date})</p>
                  </p>
                  <p className="text-xs">{version.description}</p>
                  {version?.issues?.length ? (
                    <div className="w-1/2">
                      <ProgressBar issues={version.issues} />
                    </div>
                  ) : (
                    <></>
                  )}

                  <div>
                    <p className="text-xs mb-1">Related issues</p>
                    {version.issues?.length ? (
                      version.issues.map((issue) => {
                        const shouldDisplayTask = isCheckedBoxRoadmap.task && issue.tracker.name === "Task";
                        const shouldDisplayBug = isCheckedBoxRoadmap.bug && issue.tracker.name === "Bug";
                        if (shouldDisplayTask || shouldDisplayBug) {
                          return (
                            <div key={issue.id} className="flex gap-1 text-xs border border-gray-200 p-1 hover:bg-light-yellow mr-1">
                              <p className="text-ocean-blue hover:underline">{`${issue.tracker.name} #${issue.id}:`}</p> {issue.subject}
                            </div>
                          );
                        }
                        return null;
                      })
                    ) : (
                      <p className="text-10">No issues for this version</p>
                    )}
                  </div>
                </React.Fragment>
              );
            })
          ) : (
            <SyncLoader className="ml-4" loading={true} color="#169" size={5} />
          )}
        </div>
      </div>
      <SideBar listVersionOfProject={listVersionOfProject} handleApply={handleApply} />
    </div>
  );
};

export default Roadmap;

import Document from "~/assets/images/ticket.png";
import Group from "~/assets/images/group.png";
import { useEffect, useState } from "react";
import projectsApi from "~/apis/projects.api";
import issuesApi from "~/apis/issue.api";
import projectMembershipsApi from "~/apis/projectMemberships.api";
import { SyncLoader } from "react-spinners";

type Member = {
  id: number;
  name: string;
  role: string;
};

type Accumulator = {
  [role: string]: Member[];
};

const Overview = ({ projectId }: { projectId: number }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [issueTracker, setIssueTracker] = useState({});
  const [members, setMembers] = useState<Member[]>([]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await projectsApi.getProjectById({ id: projectId, include: "trackers" });
      const trackerArray = response.data.project.trackers;
      const listIssuesProject = await issuesApi.listIssues({ project_id: projectId });
      const arrayIssues = listIssuesProject.data.issues;

      trackerArray?.map((trackerItem) => {
        const count = arrayIssues.filter((item) => {
          return item.tracker.name === trackerItem.name;
        });
        setIssueTracker((issueTracker) => ({
          ...issueTracker,
          [trackerItem.name]: count.length,
        }));
      });

      const memberList = await projectMembershipsApi.getProjectMemberships(projectId);
      const arrayMember = memberList.data.memberships;
      arrayMember.map((mem) => {
        setMembers((prevState) => [
          ...prevState,
          {
            id: mem.user.id,
            name: mem.user?.name ?? "",
            role: mem.roles[0]?.name ?? "",
          },
        ]);
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <>
      <div className="p-2.5 pt-1">
        <h2 className="text-xl font-semibold pt-0.5 pr-3 mb-3 text-mouse-gray">Overview</h2>
        <div className="flex justify-between gap-6 items-center">
          <div className="border-[1px] bg-[#fcfcfc] p-1.5 w-[50%]">
            <div className="flex gap-1 text-mouse-gray font-bold text-base items-center">
              <img src={Document} alt="" className="w-4 h-4" />
              <span>Issue tracking</span>
            </div>
            {loading ? (
              <SyncLoader color="#169" size={5} />
            ) : (
              <ul className="text-xs list-disc text-[#505050] pl-10 my-3">
                {Object.entries(issueTracker).map(([key, value]) => {
                  return (
                    <li className="leading-[18px]">
                      <span>
                        <a href="#" className="text-ocean-blue mr-1 hover:text-[#c61a1a] hover:underline">
                          {`${key}:`}
                        </a>
                        {`${value} open / ${value}`}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}

            <div className="text-xs text-[#505050] my-3">
              <span>
                <a href="#" className="text-ocean-blue hover:text-[#c61a1a] hover:underline">
                  View all issues
                </a>
                {" | "}
                <a href="#" className="text-ocean-blue hover:text-[#c61a1a] hover:underline">
                  Calendar
                </a>
                {" | "}
                <a href="#" className="text-ocean-blue hover:text-[#c61a1a] hover:underline">
                  Gantt
                </a>
              </span>
            </div>
          </div>
          <div className="border-[1px] bg-[#fcfcfc] p-1.5 w-[50%]">
            <div className="flex gap-1 text-mouse-gray font-bold text-base items-center">
              <img src={Group} alt="" />
              <span>Member</span>
            </div>
            {loading ? (
              <SyncLoader color="#169" size={5} />
            ) : (
              <div className="text-xs text-[#505050] my-4">
                {Object.entries(
                  members.reduce<Accumulator>((acc, item) => {
                    if (!acc[item.role]) {
                      acc[item.role] = [];
                    }
                    acc[item.role].push(item);
                    return acc;
                  }, {}),
                ).map(([key, value]) => {
                  return (
                    <div key={key}>
                      <span>{key} :</span>
                      {value.map((item, index) => {
                        return (
                          <a href="#" className="text-ocean-blue hover:text-[#c61a1a] hover:underline">
                            {`${item.name} ${index !== value.length - 1 ? "," : ""}`}
                          </a>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;

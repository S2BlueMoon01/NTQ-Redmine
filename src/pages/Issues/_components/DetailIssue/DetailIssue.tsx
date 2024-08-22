import { useEffect, useRef, useState } from "react";
import IconSearch from "~/assets/images/magnifier.png";
import TimeAdd from "~/assets/images/time_add.png";
import StarIcon from "~/assets/images/star-img.png";
import StarOffIcon from "~/assets/images/fav_off_start.png";

import CopyIcon from "~/assets/images/copy.png";
import EditIcon from "~/assets/images/edit-img.png";
import WifiImg from "~/assets/images/wifi-img.png";
import Button from "~/components/Button";
import Select from "~/components/Select";
import SideBar from "../SideBarDetail";
import EditIssueForm from "../EditIssueForm";
import issuesApi from "~/apis/issue.api";
import { useNavigate, useParams } from "react-router-dom";
import { CustomFields, Issue } from "~/types/issue.type";
import { convertDateFormat, getSecondsDifference } from "~/utils/utils";
import { Helmet } from "react-helmet-async";
import { useGlobalStore } from "~/store/globalStore";
import IconSuccess from "~/assets/images/apply-img.png";

interface Options {
  label: string;
  value: string | number;
}

const DetailIssue = () => {
  const { id, name, issueId } = useParams();
  const [isActive, setIsActive] = useState(false);
  const [displayRelatedIssue, setDisplayRelatedIssue] = useState<boolean>(false);
  const [isActiveEdit, setIsActiveEdit] = useState(false);
  const [isWatchIssue, setIsWatchIssue] = useState(false);
  const [listIssuesOfProject, setListIssuesOfProject] = useState<Issue[]>([]);
  const index = listIssuesOfProject.findIndex((issue) => issue.id === Number(issueId));
  const [indexOfIssue, setIndexOfIssue] = useState<number>(index);
  const [issue, setIssuesOfId] = useState<Issue>({} as Issue);
  const [relatedIssueOptions, _setRelatedIssueOptions] = useState<Options[]>([
    { label: "Related to", value: "relates" },
    { label: "Duplicates", value: "duplicates" },
    { label: "Duplicated by", value: "duplicated" },
    { label: "Blocks", value: "blocks" },
    { label: "Precedes", value: "precedes" },
    { label: "Follows", value: "follows" },
    { label: "Copied to", value: "copied_to" },
    { label: "Copied from", value: "copied_from" },
  ]);
  const projectID = Number(id) ? Number(id) : 323;
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement | null>(null);
  const { isSuccessEdit, setIsSuccessEdit } = useGlobalStore((state) => ({
    isSuccessEdit: state.isSuccessEdit,
    setIsSuccessEdit: state.setIsSuccessEdit,
  }));

  const fetchIssuesOfProject = async () => {
    const response = await issuesApi.listIssues({ project_id: projectID, limit: 100 });
    const listIssuesProject = response.data.issues;
    const IssueOfId = await issuesApi.getIssueById({ id: Number(issueId) });
    const index = listIssuesProject.findIndex((issue) => issue.id === Number(issueId));
    const customFields = listIssuesProject[index]?.custom_fields?.reduce((acc: CustomFields, item) => {
      const formattedName = item.name.replace(/\s+/g, "").replace(/^[a-z]/, (match) => match.toLowerCase());
      acc[formattedName] = item.value;
      return acc;
    }, {} as CustomFields);
    setListIssuesOfProject(listIssuesProject);
    setIndexOfIssue(index);
    setIssuesOfId(listIssuesProject[index]);
    setIssuesOfId({ ...IssueOfId?.data?.issue, ...customFields });
  };

  useEffect(() => {
    fetchIssuesOfProject();
  }, [issueId]);

  const handleClickNext = () => {
    if (indexOfIssue < listIssuesOfProject.length - 1) {
      navigate(`/projects/${id}/${name}/issues/${listIssuesOfProject[indexOfIssue + 1]?.id}`);
      setIsActiveEdit(false);
    }
  };

  const handleClickPrevious = () => {
    if (indexOfIssue > 0) {
      navigate(`/projects/${id}/${name}/issues/${listIssuesOfProject[indexOfIssue - 1]?.id}`);
      setIsActiveEdit(false);
    }
  };

  const handleShowEditForm = () => {
    if (issue.id !== undefined) {
      setIsActiveEdit(true);
      setTimeout(() => {
        if (formRef.current) {
          formRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 1000);
    }
  };

  useEffect(() => {
    if (isSuccessEdit) {
      fetchIssuesOfProject();
      const timer = setTimeout(() => {
        setIsSuccessEdit(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isSuccessEdit]);

  return (
    <div className="flex gap-2">
      <Helmet>
        <title>{`Detail Issue - ${name} - NTQ Redmine`}</title>
        <meta name="description" content="Redmine" />
      </Helmet>
      <div className="min-h-84 flex flex-col gap-2 bg-white px-3 mt-3 border pb-6 w-9/12">
        {isSuccessEdit && (
          <div className="flex mt-3 items-center text-xs text-lime-900 p-2 bg-green-100 border-2 border-lime-500">
            <img className="flex w-fit h-fit" src={IconSuccess} alt="Error" />
            <div className="pl-5">Successful creation.</div>
          </div>
        )}
        <div className="flex justify-between mt-2 items-center">
          <h2 className="text-mouse-gray font-bold ">{issue ? `${issue?.tracker?.name} #${issue?.id} ` : ""}</h2>
          <div className="flex gap-2 text-10 text-ocean-blue">
            <button className="flex gap-1 hover:underline" onClick={handleShowEditForm}>
              <img src={EditIcon} className="w-4" alt="Time add" /> Edit
            </button>
            <button className="flex gap-1 hover:underline" onClick={() => navigate(`/projects/${id}/${name}/issues/${issueId}/time_entries/new`)}>
              <img src={TimeAdd} className="w-4" alt="Time add" /> Log time
            </button>
            <button className="flex gap-1 hover:underline" onClick={() => setIsWatchIssue(!isWatchIssue)}>
              <img src={isWatchIssue ? StarIcon : StarOffIcon} className="w-4" alt="Time add" /> {isWatchIssue ? "Unwatch" : "Watch"}
            </button>
            <button className="flex gap-1 hover:underline">
              <img src={CopyIcon} className="w-4" alt="Time add" /> Copy
            </button>
          </div>
        </div>
        {issue && (
          <div className="bg-light-yellow p-3 border flex flex-col gap-1">
            <div className="flex justify-between">
              <div className="flex gap-2 flex-wrap">
                <img
                  className="size-16 p-1 border bg-white"
                  src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
                  alt="avatar"
                />
                <div className="flex flex-col gap-2 text-left">
                  <h3 className="text-base font-bold text-mouse-gray whitespace-normal">{issue?.subject}</h3>
                  <span className="text-xs font-light whitespace-normal">
                    Added by{" "}
                    <a href="" className="link">
                      {issue?.author?.name}
                    </a>{" "}
                    <a href="" className="link">
                      {`${getSecondsDifference(issue?.created_on)} `}
                    </a>
                    ago.
                  </span>
                </div>
              </div>
              <div className="text-10 text-gray-500 items-start flex gap-1">
                <button
                  title={indexOfIssue === 0 && listIssuesOfProject ? " " : `${listIssuesOfProject[indexOfIssue - 1]?.id}`}
                  className={` ${indexOfIssue === 0 ? "text-gray-300" : "text-ocean-blue hover:underline"} `}
                  onClick={handleClickPrevious}
                >
                  « Previous
                </button>
                <span className="position">
                  | {indexOfIssue == -1 ? " " : indexOfIssue + 1} of {listIssuesOfProject.length} |
                </span>
                <button
                  className={` ${indexOfIssue === listIssuesOfProject.length - 1 ? "text-gray-500" : "text-ocean-blue hover:underline"} `}
                  title={
                    indexOfIssue === listIssuesOfProject.length - 1 && listIssuesOfProject ? " " : `${listIssuesOfProject[indexOfIssue + 1]?.id}`
                  }
                  onClick={handleClickNext}
                >
                  Next »
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 text-xs font-semibold p-3 text-mouse-gray">
              <div className="grid grid-rows-8 grid-flow-col">
                <label>Status:</label>
                <label>Priority:</label>
                <label>Assignee:</label>
                <label>Category:</label>
                <label>Target version:</label>
                <label>Bug Type:</label>
                <label>Severity:</label>
                <label>QC Activity:</label>
              </div>
              <div className="grid grid-rows-8 grid-flow-col font-normal">
                <span>{issue?.status?.name ? issue?.status?.name : "-"}</span>
                <span>{issue?.priority?.name ? issue?.priority?.name : "-"}</span>
                <a href="" className="text-ocean-blue font-normal">
                  {issue?.assigned_to ? issue?.assigned_to?.name : "-"}
                </a>
                <span>-</span>
                <span>{issue?.fixed_version?.name ? issue?.fixed_version?.name : "-"}</span>
                <span>{issue?.BugType ? issue?.BugType : "-"}</span>
                <span>{issue?.Severity ? issue?.Severity : "-"}</span>
                <span>{issue?.QCActivity ? issue?.QCActivity : "-"}</span>
              </div>
              <div className=" grid grid-rows-8 grid-flow-col">
                <label>Start date:</label>
                <label>Due date:</label>
                <label>% Done:</label>
                <label>Estimated time:</label>
                <label>Spent time:</label>
                <label>Cause Category:</label>
                <label>Is Degrade?:</label>
                <label>Reopen counter:</label>
              </div>
              <div className=" grid grid-rows-8 grid-flow-col font-normal">
                <span> {issue.start_date && convertDateFormat(issue.start_date)}</span>
                <span> {issue.due_date && convertDateFormat(issue.due_date)}</span>
                <div className="gap-1 inline-flex align-top w-1/2 min-w-14">
                  <div className="w-[100px] h-5 overflow-hidden bg-slate-200 inline-block align-top">
                    <div className="loading-progress bg-green-300 h-full " style={{ width: `${issue.done_ratio}px` }}></div>
                  </div>
                  <span className="text-10 align-top pl-2">{issue.done_ratio ? issue.done_ratio : 0}%</span>
                </div>
                <span>{issue.estimated_hours ? issue.estimated_hours.toFixed(2) : 0} hours</span>
                <span>{issue?.spent_hours ? `${issue?.spent_hours.toFixed(2)} hours` : "-"}</span>
                <span>{issue?.CauseCategory && issue?.CauseCategory.length ? issue?.CauseCategory.map((item) => item) : "-"}</span>
                <span>{issue["IsDegrade?"] ? issue["IsDegrade?"] : "-"}</span>
                <span>{issue?.Reopencounter ? issue?.Reopencounter : "-"}</span>
              </div>
            </div>

            <hr />

            <div className="flex flex-col py-2 text-left gap-3">
              <label htmlFor="" className="text-xs text-zinc-700 font-bold  inline-block">
                Description
              </label>
              <div className="text-xs text-zinc-700"> {issue.description ? issue.description : "description is empty"}</div>
            </div>
            <hr className="my-1" />
            <div className="flex items-center justify-between">
              <label htmlFor="" className="py-2 inline-block text-xs text-zinc-700 font-bold">
                Subtasks
              </label>
              <a href="#!" className="link">
                Add
              </a>
            </div>

            <hr className="my-1" />
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <label htmlFor="" className="py-2 inline-block text-xs text-zinc-700  font-bold">
                  Related issues
                </label>
                <a href="#!" className="link" onClick={() => setDisplayRelatedIssue(true)}>
                  Add
                </a>
              </div>
              {displayRelatedIssue && (
                <div className="flex gap-1 text-xs font-light items-center">
                  <Select className="text-xs">
                    {relatedIssueOptions.map((issue) => {
                      return <option value={issue.value}>{issue.label}</option>;
                    })}
                  </Select>
                  <span className="">Issue #</span>
                  <div className={`flex items-center border ml-1 w-32 ${isActive ? "border-black rounded-sm" : ""}`}>
                    <img src={IconSearch} alt="IconSearch" className="px-1" />
                    <input
                      id="ParentTask"
                      type="text"
                      className="outline-none w-full text-xs py-1"
                      onFocus={() => setIsActive(true)}
                      onBlur={() => setIsActive(false)}
                    />
                  </div>
                  <Button type="button">Add</Button>
                  <a href="#!" className="link" onClick={() => setDisplayRelatedIssue(false)}>
                    Cancel
                  </a>
                  <></>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="text-left text-sm px-3 py-1 text-mouse-gray">
          <div className="font-bold pb-1">History</div>
          <div className="pt-1 text-xs">
            <div className="flex justify-between">
              <div className="flex items-center gap-1">
                <img
                  src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
                  alt="Avatar"
                  className="size-8"
                />
                <span className="font-bold">
                  Updated by{" "}
                  <a href="" className="link font-bold">
                    Son (internship) Nguyen Hoang Huu
                  </a>{" "}
                  <a href="" className="link font-bold">
                    38 minutes
                  </a>{" "}
                  ago
                </span>
              </div>
              <a className="link font-bold">#1</a>
            </div>

            <ul className="pl-11 text-zinc-700 list-disc">
              <li className="py-3">
                <span className="text-xs font-bold">% Done changed</span> from 10 to 70
              </li>
            </ul>
          </div>
        </div>

        <div className="flex gap-2 text-10 justify-end text-ocean-blue">
          <button className="flex gap-1 hover:underline" onClick={handleShowEditForm}>
            <img src={EditIcon} className="w-4" alt="Time add" /> Edit
          </button>
          <button className="flex gap-1 hover:underline" onClick={() => navigate(`/projects/${id}/${name}/issues/${issueId}/time_entries/new`)}>
            <img src={TimeAdd} className="w-4" alt="Time add" /> Log time
          </button>
          <button className="flex gap-1 hover:underline" onClick={() => setIsWatchIssue(!isWatchIssue)}>
            <img src={isWatchIssue ? StarIcon : StarOffIcon} className="w-4" alt="Time add" /> {isWatchIssue ? "Unwatch" : "Watch"}
          </button>
          <button className="flex gap-1 hover:underline">
            <img src={CopyIcon} className="w-4" alt="Time add" /> Copy
          </button>
        </div>

        {isActiveEdit && (
          <div className="mt-5 flex flex-col gap-2">
            <h2 className="text-mouse-gray text-sm">Edit</h2>
            <div className=" min-h-52 pb-3 border">
              <EditIssueForm formRef={formRef} dataEdit={issue} setIsActiveEdit={setIsActiveEdit} />
            </div>
          </div>
        )}

        <p className="text-10 flex gap-1 justify-end mt-1.5">
          Also available in: <img src={WifiImg} alt="img" />{" "}
          <a className="text-ocean-blue" href="">
            Atom | PDF
          </a>
        </p>
      </div>
      <SideBar idIssue={issue.id} />
    </div>
  );
};

export default DetailIssue;

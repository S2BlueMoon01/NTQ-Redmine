import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import Label from "~/components/Label";
import Input from "~/components/Input";
import IconAdd from "~/assets/images/icon-add.png";
import IconSearch from "~/assets/images/magnifier.png";
import Button from "~/components/Button";
import DatePickerCustom from "~/components/DatePicker";
import ErrorImg from "~/assets/images/error-img.png";
import EnhanceSelect from "~/components/EnhanceSelect";
import Editor from "~/components/Editor";
import { Issue } from "~/types/issue.type";
import issuesApi from "~/apis/issue.api";
import projectMembershipsApi from "~/apis/projectMemberships.api";
import ModalNewVersion from "~/pages/IssuesCreate/_components/ModalNewVersion";
import { Controller, useForm } from "react-hook-form";
import versionsApi from "~/apis/versions.api";
import moment from "moment";

interface Member {
  id: number;
  name: string;
  role: string;
}

interface Task {
  id: number;
  name: string;
}

interface PropsEdit {
  formRef: React.MutableRefObject<HTMLFormElement | null>;
  dataEdit: Issue;
  setIsActiveEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const trackerOptions = [
  { label: "Bug", value: 1 },
  { label: "Task", value: 4 },
];

const statusOptions = [
  { label: "New", value: 1 },
  { label: "In Progress", value: 2 },
  { label: "Resolved", value: 3 },
  { label: "Feedback", value: 4 },
  { label: "Closed", value: 5 },
  { label: "Can't fix", value: 6 },
  { label: "Next Release", value: 7 },
  { label: "Watching", value: 8 },
  { label: "Release OK ", value: 9 },
  { label: "Task", value: 10 },
  { label: "Done STG", value: 11 },
  { label: "Release Honban (Done Honban)", value: 12 },
];

const percentDoneOptions = [
  { label: "0%", value: 0 },
  { label: "10%", value: 10 },
  { label: "20%", value: 20 },
  { label: "30%", value: 30 },
  { label: "40%", value: 40 },
  { label: "50%", value: 50 },
  { label: "60%", value: 60 },
  { label: "70%", value: 70 },
  { label: "80%", value: 80 },
  { label: "90%", value: 90 },
  { label: "100%", value: 100 },
];

const priorityOptions = [
  { label: "Low", value: 1 },
  { label: "Normal", value: 2 },
  { label: "High", value: 3 },
  { label: "Urgent", value: 4 },
  { label: "Immediate", value: 5 },
];

const bugTypeOptions = [
  { label: "GUI", value: "GUI" },
  { label: "Function", value: "Function" },
  { label: "Non-function", value: "Non-function" },
  { label: "Others", value: "Others" },
];

const severityOptions = [
  { label: "Critical", value: "Critical" },
  { label: "Major", value: "Major" },
  { label: "Moderate", value: "Moderate" },
  { label: "Minor", value: "Minor" },
  { label: "Cosmetic", value: "Cosmetic" },
];

const qcActivityOptions = [
  { label: "Code Review", value: "Code Review" },
  { label: "Unit test", value: "Unit test" },
  { label: "Integration test", value: "Integration test" },
  { label: "System test", value: "System test" },
  { label: "Document Review", value: "Document Review" },
  { label: "Acceptance Review", value: "Acceptance Review" },
  { label: "Acceptance Test", value: "Acceptance Test" },
  { label: "Other Review", value: "Other Review" },
  { label: "Other Test", value: "Other Test" },
];

const causeCategoryOptions = [
  { label: "1.1. REQ_Missing or incomplete", value: "1.1. REQ_Missing or incomplete" },
  { label: "2.1. DES_Missing or incomplete", value: "2.1. DES_Missing or incomplete" },
  { label: "3.1. PRO_Missing or Incomplete", value: "3.1. PRO_Missing or Incomplete" },
  { label: "4.1. IMP_Discipline/Process non-compliance", value: "4.1. IMP_Discipline/Process non-compliance" },
  { label: "4.2. IMP_Insuffcient analysis before implementation", value: "4.2. IMP_Insuffcient analysis before implementation" },
  { label: "4.3. IMP_Shortage of time", value: "4.3. IMP_Shortage of time" },
  { label: "4.5. IMP_Lack of testing", value: "4.5. IMP_Lack of testing" },
  { label: "5.1. COM_Missing communication", value: "5.1. COM_Missing communication" },
  { label: "5.2. COM_Missing confirmation", value: "5.2. COM_Missing confirmation" },
  { label: "6.1. SKI_Inadequate language proficiency", value: "6.1. SKI_Inadequate language proficiency" },
  { label: "6.2. SKI_Shortage of business domain expertise", value: "6.2. SKI_Shortage of business domain expertise" },
  { label: "8. Inconsistency in document or design", value: "8. Inconsistency in document or design" },
  { label: "9. Other", value: "9. Other" },
];

const isDegradeOptions = [
  { label: "Yes", value: 1 },
  { label: "No", value: 0 },
];

const OPTIONS_ACTIVITY = [
  { value: 8, label: "Create" },
  { value: 9, label: "Review" },
  { value: 16, label: "Correct" },
  { value: 15, label: "Study" },
  { value: 14, label: "Test" },
  { value: 17, label: "Translate" },
  { value: 26, label: "Verify" },
  { value: 27, label: "Re-test" },
  { value: 28, label: "Regression test" },
  { value: 29, label: "Meeting" },
  { value: 31, label: "Selftest" },
  { value: 32, label: "Report" },
];

const OPTIONS_CATEGORY = [
  { value: "Requirement / SRS", label: "Requirement / SRS" },
  { value: "Estimation", label: "Estimation" },
  { value: "Plan / Schedule", label: "Plan / Schedule" },
  { value: "Report", label: "Report" },
  { value: "Basic Design", label: "Basic Design" },
  { value: "Detail Design", label: "Detail Design" },
  { value: "Code", label: "Code" },
  { value: "UT Case", label: "UT Case" },
  { value: "IT Viewpoint / Case", label: "IT Viewpoint / Case" },
  { value: "IT Report", label: "IT Report" },
  { value: "ST Viewpoint/Case", label: "ST Viewpoint/Case" },
  { value: "ST Report", label: "ST Report" },
  { value: "Test estimation", label: "Test estimation" },
  { value: "Test Plan/Schedule", label: "Test Plan/Schedule" },
  { value: "Bug list", label: "Bug list" },
  { value: "Other", label: "Other" },
];

const EditIssueForm: React.FC<PropsEdit> = ({ formRef, dataEdit, setIsActiveEdit }) => {
  const { id, issueId } = useParams();
  const [isActiveParentTask, setIsActiveParentTask] = useState(false);
  const [error, setError] = useState(false);
  const [newVersion, setNewVersion] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<Task[]>([]);
  const [allIssue, setAllIssue] = useState<Task[]>([]);
  const [errorFile, setErrorFile] = useState<string | null>(null);
  const maxSize = 100 * 1024 * 1024;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [assigneeOptions, setAssigneeOptions] = useState([
    { label: "", value: 0 },
    { label: "<<me>>", value: 1 },
  ]);
  const [versionOptions, setVersionOptions] = useState([{ label: "", value: 0 }]);
  const [isAddWatcher, setIsAddWatcher] = useState<boolean>(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filtered = allIssue.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredItems(filtered);
  };

  const handleItemClick = (id: number) => {
    setSearchTerm(id.toString());
    setFilteredItems([]);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (file.size > maxSize) {
        setErrorFile("File size exceeds the 500MB limit.");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        setErrorFile(null);
        // Handle file upload
      }
    }
  };

  const convertListIssue = (listItem: Issue[]): Task[] => {
    const newList = listItem.map((item) => ({
      id: item.id,
      name: `${item.tracker.name} #${item.id}: ${item.subject}`,
    }));

    return newList;
  };

  // const handleMultiSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const options = event.target.options;
  //   const selectedValues: string[] = [];
  //   for (let i = 0; i < options.length; i++) {
  //     if (options[i].selected) {
  //       selectedValues.push(options[i].value);
  //     }
  //   }
  //   // setMiddleArray(selectedValues);
  // };

  const fetchProject = async () => {
    try {
      setLoading(true);

      const memberList = await projectMembershipsApi.getProjectMemberships(Number(id));
      const arrayMember = memberList.data.memberships;
      arrayMember.forEach((mem) => {
        setMembers((prevState) => [
          ...prevState,
          {
            id: mem.user.id,
            name: mem.user?.name ?? "",
            role: mem.roles[0]?.name ?? "",
          },
        ]);
      });
      const assigneeArray = arrayMember.map((item) => ({
        label: item.user.name,
        value: item.user.id,
      }));
      setAssigneeOptions((assigneeOptions) => [...assigneeOptions, ...assigneeArray]);
      const responseVersion = await versionsApi.getAllVersionOfProject({ idProject: Number(id) });
      console.log(responseVersion);
      const versionOpenArray = responseVersion.data.versions.reduce<{ label: string; value: number }[]>((acc, item) => {
        if (item.status === "open") {
          acc.push({
            label: item.name,
            value: item.id,
          });
        }
        return acc;
      }, []);
      setVersionOptions((versionOptions) => [...versionOptions, ...versionOpenArray]);
      const responseIssue = await issuesApi.listIssues({ project_id: Number(id) });
      const issueConvert = convertListIssue(responseIssue.data.issues);
      setAllIssue(issueConvert);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const UpdateIssuesByID = async (data: Partial<Issue>) => {
    const responses = await issuesApi.updateIssue(Number(issueId), data);
    console.log(responses);
    if (responses.status === 200) {
      setIsActiveEdit(false);
    }
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: {}) => UpdateIssuesByID(data);

  return (
    <>
      {newVersion && <ModalNewVersion handleClick={setNewVersion} />}
      <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
        <div className="relative m-2 pt-1 border min-h-84 bg-white p-3 mt-3 pb-3">
          <span className="text-10 px-1 absolute -top-2 left-3 bg-white cursor-pointer text-gray-rain">Change properties</span>
          {error && (
            <div className="pt-2">
              <div className="flex border-red-600 items-center text-sm border-2 bg-[#ffe3e3] gap-3 p-[2px] mt-2 mb-3">
                <figure className="ml-2">
                  <img src={ErrorImg} alt="error" />
                </figure>
                <span className="text-[#880000]">{`Subject can't be blank`}</span>
              </div>
            </div>
          )}
          <div className="w-full py-2">
            <Input id="project_id" className="ml-2 text-xs hidden" {...register("project_id")} value={dataEdit.project.id} />
            <div className="flex">
              <Label htmlFor="tracker" isRequired={true} className="flex gap-1 items-center p-0" name="Tracker">
                <Controller
                  name="tracker_id"
                  control={control}
                  defaultValue={dataEdit?.tracker?.id}
                  render={({ field }) => (
                    <EnhanceSelect
                      id="tracker_id"
                      className="text-xs font-normal text-black"
                      arrayOption={trackerOptions}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                  )}
                />
              </Label>
            </div>
            <div className="flex">
              <Label htmlFor="subject" isRequired={true} className="flex gap-1 items-center p-0" name="Subject" />
              <Controller
                name="subject"
                control={control}
                defaultValue={dataEdit.subject}
                rules={{ required: "Subject can't be blank" }}
                render={({ field }) => <Input id="subject" style={{ width: "calc(100% - 225px)" }} className="ml-2 text-xs" {...field} />}
              />
            </div>
            <div className="flex">
              <Label htmlFor="textareaEdit" className="flex gap-1 items-center p-0 " name="Description"></Label>
              <Editor description={dataEdit.description} />
            </div>
            {/* Row 1 */}
            <div className="flex">
              <div className="w-1/2">
                <div className="flex">
                  <Label htmlFor="status_id" className="flex gap-1 items-center p-0" name="Status" isRequired></Label>
                  <Controller
                    name="status_id"
                    control={control}
                    defaultValue={dataEdit?.status.id}
                    rules={{ required: "Status can't be blank" }}
                    render={({ field }) => (
                      <EnhanceSelect
                        id="status_id"
                        className="w-full text-xs font-normal text-black"
                        arrayOption={statusOptions}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="w-1/2">
                <div className="flex relative">
                  <Label htmlFor="parent_issue_id" className="flex gap-1 items-center p-0 parent-task" name="Parent task"></Label>
                  <div className={`flex items-center border ml-1 w-32 ${isActiveParentTask ? "border-black rounded-sm" : ""}`}>
                    <img src={IconSearch} alt="IconSearch" className="px-1" />
                    <input
                      id="parent_issue_id"
                      type="text"
                      className="outline-none w-full text-xs py-1"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      onFocus={() => setIsActiveParentTask(true)}
                      onBlur={() => setIsActiveParentTask(false)}
                    />
                  </div>
                  {isActiveParentTask && filteredItems.length > 0 && (
                    <div
                      className="absolute top-[30px] left-[180px] border border-gray-300 bg-white z-10 max-h-48 overflow-y-auto"
                      style={{ width: "calc(100% - 225px)" }}
                    >
                      {filteredItems.map((item) => (
                        <div key={item.id} className="border-b border-[#eee] text-xs hover:bg-blue-300" onClick={() => handleItemClick(item.id)}>
                          {item.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Row 2 */}
            <div className="flex items-center">
              <div className="w-1/2">
                <div className="flex">
                  <Label htmlFor="priority_id" className="flex gap-1 items-center p-0" name="Priority" isRequired></Label>
                  <Controller
                    name="priority_id"
                    control={control}
                    defaultValue={dataEdit?.priority.id}
                    rules={{ required: "Priority can't be blank" }}
                    render={({ field }) => (
                      <EnhanceSelect
                        id="priority_id"
                        className="w-full text-xs font-normal text-black"
                        arrayOption={priorityOptions}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="w-1/2">
                <div className="flex">
                  <Label htmlFor="StartDate" className="flex gap-1 items-center p-0" name="Start date"></Label>
                  <Controller
                    control={control}
                    name="start_date"
                    defaultValue={dataEdit?.start_date ? moment(dataEdit.start_date).format("YYYY-MM-DD") : null}
                    render={({ field }) => (
                      <DatePickerCustom
                        id="start_date"
                        selected={field.value ? new Date(field.value) : dataEdit?.start_date ? new Date(dataEdit.start_date) : null}
                        onChange={(date) => {
                          const formattedDate = date ? moment(date).format("YYYY-MM-DD") : "";
                          field.onChange(formattedDate);
                        }}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            {/* Row 3 */}
            <div className="flex items-center">
              <div className="w-1/2">
                <div className="flex">
                  <Label htmlFor="assigned_to_id" className="flex gap-1 items-center p-0" name="Assignee"></Label>
                  <Controller
                    name="assigned_to_id"
                    control={control}
                    defaultValue={dataEdit?.assigned_to?.id}
                    render={({ field }) => (
                      <EnhanceSelect
                        id="assigned_to_id"
                        className="w-full text-xs font-normal text-black"
                        arrayOption={assigneeOptions}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="w-1/2">
                <div className="flex">
                  <Label htmlFor="DueDate" className="flex gap-1 items-center p-0" name="Due date"></Label>
                  <Controller
                    control={control}
                    name="due_date"
                    defaultValue={dataEdit?.start_date ? moment(dataEdit.due_date).format("YYYY-MM-DD") : null}
                    render={({ field }) => (
                      <DatePickerCustom
                        id="due_date"
                        selected={field.value ? new Date(field.value) : dataEdit?.due_date ? new Date(dataEdit.due_date) : null}
                        onChange={(date) => {
                          const formattedDate = date ? moment(date).format("YYYY-MM-DD") : "";
                          field.onChange(formattedDate);
                        }}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            {/* Row 4 */}
            <div className="flex items-center">
              <div className="w-1/2">
                <div className="flex gap-0.5 items-center">
                  <Label htmlFor="fixed_version_id" className="flex gap-1 items-center p-0" name="Target version" />
                  <Controller
                    name="fixed_version_id"
                    control={control}
                    defaultValue={dataEdit?.fixed_version?.id}
                    render={({ field }) => (
                      <EnhanceSelect
                        id="fixed_version_id"
                        className="w-full pr-10 text-xs font-normal text-black"
                        arrayOption={versionOptions}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                      />
                    )}
                  />
                  <img src={IconAdd} alt="IconAdd" className="cursor-pointer" onClick={() => setNewVersion(true)} />
                </div>
              </div>
              <div className="w-1/2">
                <div className="flex items-center">
                  <Label htmlFor="estimated_hours" className="flex gap-1 items-center p-0" name="Estimate time"></Label>
                  <Controller
                    name="estimated_hours"
                    control={control}
                    defaultValue={dataEdit.estimated_hours}
                    render={({ field }) => <Input id="estimated_hours" className="ml-1 w-14 text-xs" {...field} />}
                  />
                  <span className="text-xs text-mouse-gray ">Hours</span>
                </div>
              </div>
            </div>
            {/* Row 5 */}
            <div className="flex items-center">
              <div className="w-1/2"></div>
              <div className="w-1/2">
                <div className="flex">
                  <Label htmlFor="done_ratio" className="flex gap-1 items-center p-0" name="% Done" />
                  <Controller
                    name="done_ratio"
                    control={control}
                    defaultValue={dataEdit?.done_ratio}
                    render={({ field }) => (
                      <EnhanceSelect
                        id="done_ratio"
                        className="text-xs font-normal text-black"
                        arrayOption={percentDoneOptions}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            {/* Row 6 */}
            <div className="flex items-center">
              <div className="w-1/2">
                <div className="flex">
                  <Label htmlFor="bugType" className="flex gap-1 items-center p-0" name="Bug Type" isRequired />
                  {/* <Controller
                    name="done_ratio"
                    control={control}
                    defaultValue={dataEdit?.done_ratio}
                    render={({ field }) => (
                      <EnhanceSelect
                        id="done_ratio"
                        className="text-xs font-normal text-black"
                        arrayOption={percentDoneOptions}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                      />
                    )}
                  /> */}
                  <EnhanceSelect
                    id="bugType"
                    className="text-xs font-normal text-black w-1/3 ml-2"
                    arrayOption={bugTypeOptions}
                    value={dataEdit.BugType}
                  />
                </div>
                <div className="flex">
                  <Label htmlFor="severity" className="flex gap-1 items-center p-0" name="Severity" isRequired></Label>
                  <EnhanceSelect
                    id="severity"
                    className="text-xs font-normal text-black w-1/3 ml-2"
                    arrayOption={severityOptions}
                    value={dataEdit.Severity}
                  />
                </div>
                <div className="flex">
                  <Label htmlFor="qcActivity" className="flex gap-1 items-center p-0" name="QC Activity" isRequired></Label>
                  <EnhanceSelect
                    id="qcActivity"
                    className="text-xs font-normal text-black w-1/3 ml-2"
                    arrayOption={qcActivityOptions}
                    value={dataEdit.QCActivity}
                  />
                </div>
              </div>
              <div className="w-1/2 h-full">
                <div className="flex h-full">
                  <Label htmlFor="causeCategory" className="flex gap-1 items-center p-0" name="Cause Category" isRequired></Label>
                  <EnhanceSelect
                    id="causeCategory"
                    className="text-xs font-normal text-black h-full"
                    arrayOption={causeCategoryOptions}
                    defaultValue={"9. Other"}
                    size={4}
                  />
                </div>
              </div>
            </div>
            {/* Row 7 */}
            <div className="flex items-center">
              <div className="w-1/2"></div>
              <div className="w-1/2">
                <div className="flex">
                  <Label htmlFor="isDegrade" className="flex gap-1 items-center p-0" name="Is Degrade?" isRequired></Label>
                  <EnhanceSelect
                    id="isDegrade"
                    className="text-xs font-normal text-black h-full ml-1"
                    arrayOption={isDegradeOptions}
                    defaultValue={0}
                    value={dataEdit && dataEdit["IsDegrade?"] === "Yes" ? 1 : 0}
                  />
                </div>
              </div>
            </div>
            {/* Row 8 */}
            <div className="flex items-center">
              <div className="w-1/2"></div>
              <div className="w-1/2">
                <div className="flex">
                  <Label htmlFor="reopenCounter" className="flex gap-1 items-center p-0" name="Reopen counter" isRequired></Label>
                  <Input id="reopenCounter" style={{ width: "calc(100% - 225px)" }} className="ml-1 text-xs" value={dataEdit.Reopencounter} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative m-2 pt-1 border bg-white p-3 mt-3 pb-3">
          <span className="text-10 px-1 absolute -top-2 left-3 bg-white cursor-pointer text-gray-rain">Log time</span>
          <div className="flex items-center">
            <div className="flex text-xs w-1/2 items-center">
              <Label htmlFor="spent_hours" className="flex gap-1 items-center p-0" name="Spent time"></Label>
              <Controller
                name="spent_hours"
                control={control}
                defaultValue={dataEdit.spent_hours}
                render={({ field }) => <Input id="spent_hours" className="ml-1 text-xs" {...field} />}
              />
              Hours
            </div>
            <div className="flex">
              <Label htmlFor="isDegrade" className="flex gap-1 items-center p-0" name="Activity" />
              <EnhanceSelect id="isDegrade" className="text-xs font-normal text-black h-full ml-1" arrayOption={OPTIONS_ACTIVITY} />
            </div>
          </div>
          <div className="flex">
            <Label htmlFor="comment" className="flex gap-1 items-center p-0" name="Comment" />
            <Input id="comment" style={{ width: "calc(100% - 225px)" }} className="ml-2 text-xs" {...register("comment")} />
          </div>
          <div className="flex">
            <Label htmlFor="category" isRequired className="flex gap-1 items-center p-0" name="Product Category" />
            <EnhanceSelect
              id="category"
              className="text-xs font-normal text-black h-full ml-1"
              arrayOption={OPTIONS_CATEGORY}
              defaultValue={"---Please select---"}
            />
          </div>
        </div>

        <div className="relative m-2 pt-1 border bg-white p-3 mt-3 pb-3">
          <span className="text-10 px-1 absolute -top-2 left-3 bg-white cursor-pointer text-gray-rain">Notes</span>
          <div className="pt-2 w-full">
            <Editor description={dataEdit.description} />
            <div className="flex items-center">
              <Input type="checkbox" id="private" className="text-xs" />
              <label htmlFor="private" className="text-10">
                Private note
              </label>
            </div>
          </div>
        </div>

        <div className="relative m-2 pt-1 border bg-white p-3 mt-3 pb-3">
          <span className="text-10 px-1 absolute -top-2 left-3 bg-white cursor-pointer text-gray-rain">Files</span>
          <div className="">
            <div className="text-10 pt-2 text-mouse-gray ">
              <input id="files" type="file" className="text-xs" onChange={handleFileChange} ref={fileInputRef} />
              <span>{`(Maximum size: 500MB)`}</span>
              {errorFile && <div style={{ color: "red" }}>{errorFile}</div>}
            </div>
          </div>
        </div>

        <div className="flex items-center pt-2 pl-2 gap-1">
          <Button className="text-xs" type="submit">
            Submit
          </Button>
          <div className="text-ocean-blue text-xs">
            <a href="#!" className="text-xs">
              Preview
            </a>{" "}
            |{" "}
            <span className="text-xs cursor-pointer" onClick={() => setIsActiveEdit(false)}>
              Cancel
            </span>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditIssueForm;

import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import Label from "~/components/Label";
import Input from "~/components/Input";
import IconAdd from "~/assets/images/icon-add.png";
import IconSearch from "~/assets/images/magnifier.png";
import IconBulletAdd from "~/assets/images/bullet_add.png";
import Button from "~/components/Button";
import DatePickerCustom from "~/components/DatePicker";
import ErrorImg from "~/assets/images/error-img.png";
import EnhanceSelect from "~/components/EnhanceSelect";
import Editor from "~/components/Editor";
import ModalNewVersion from "./_components/ModalNewVersion";
import projectMembershipsApi from "~/apis/projectMemberships.api";

interface Member {
  id: number;
  name: string;
  role: string;
}

const IssuesCreate = () => {
  const { id, name } = useParams();
  const [isActiveParentTask, setIsActiveParentTask] = useState(false);
  const [subject, setSubject] = useState<string>("");
  const [error, setError] = useState(false);
  const [newVersion, setNewVersion] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [assigneeOptions, setAssigneeOptions] = useState([
    { label: "", value: "" },
    { label: "<<me>>", value: "1" },
  ]);

  const [trackerOptions, _setTrackerOptions] = useState([
    { label: "Bug", value: "Bug" },
    { label: "Task", value: "Task" },
  ]);

  const [statusOptions, _setStatusOptions] = useState([
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
  ]);

  const [percentDoneOptions, _setPercentDoneOptions] = useState([
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
  ]);

  const [priorityOptions, _setPriorityOptions] = useState([
    { label: "Low", value: 1 },
    { label: "Normal", value: 2 },
    { label: "High", value: 3 },
    { label: "Urgent", value: 4 },
    { label: "Immediate", value: 5 },
    { label: "Low", value: 1 },
    { label: "Normal", value: 2 },
    { label: "High", value: 3 },
    { label: "Urgent", value: 4 },
    { label: "Immediate", value: 5 },
  ]);

  const [bugTypeOptions, _setBugTypeOptions] = useState([
    { label: "GUI", value: "GUI" },
    { label: "Function", value: "Function" },
    { label: "Non-function", value: "Non-function" },
    { label: "Others", value: "Others" },
  ]);

  const [severityOptions, _setSeverityOptions] = useState([
    { label: "Critical", value: "Critical" },
    { label: "Major", value: "Major" },
    { label: "Moderate", value: "Moderate" },
    { label: "Minor", value: "Minor" },
    { label: "Cosmetic", value: "Cosmetic" },
  ]);

  const [qcActivityOptions, _setQcActivityOptions] = useState([
    { label: "Code Review", value: "Code Review" },
    { label: "Unit test", value: "Unit test" },
    { label: "Integration test", value: "Integration test" },
    { label: "System test", value: "System test" },
    { label: "Document Review", value: "Document Review" },
    { label: "Acceptance Review", value: "Acceptance Review" },
    { label: "Acceptance Test", value: "Acceptance Test" },
    { label: "Other Review", value: "Other Review" },
    { label: "Other Test", value: "Other Test" },
  ]);

  const [causeCategoryOptions, _setCauseCategoryOptions] = useState([
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
  ]);

  const [isDegradeOptions, _setIsDegradeOptions] = useState([
    { label: "Yes", value: 1 },
    { label: "No", value: 0 },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value.trim());
  };

  const handleSubmit = () => {
    if (!subject) {
      setError(true);
    } else {
      setError(false);
    }
  };

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
        value: String(item.user.id),
      }));

      setAssigneeOptions((assigneeOptions) => [...assigneeOptions, ...assigneeArray]);

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
      {newVersion && <ModalNewVersion handleClick={setNewVersion} />}
      <Helmet>
        <title>{`New Issue - ${name} - NTQ Redmine`}</title>
        <meta name="description" content="Redmine" />
      </Helmet>
      <form action="">
        <div className="p-2.5 pt-1 min-h-84 bg-white px-3 mt-3 pb-8">
          <h2 className="text-xl font-semibold pt-0.5 pr-3 mb-3 text-mouse-gray">New issue</h2>
          {error && (
            <div className="pt-2">
              <div className="flex border-[#dd0000] items-center text-[13.2px] border-2 bg-[#ffe3e3] gap-3 p-[2px] mt-2 mb-3">
                <figure className="ml-2">
                  <img src={ErrorImg} alt="error" />
                </figure>
                <span className="text-[#880000]">{`Subject can't be blank`}</span>
              </div>
            </div>
          )}
          <div className="bg-[#fcfcfc]  w-full border border-[#e4e4e4] py-2">
            <div className="flex-block">
              <Label htmlFor="tracker" isRequired={true} className="flex gap-1 items-center p-0" name="Tracker">
                <EnhanceSelect id="tracker" className="text-[13.33px] font-normal text-[black]" arrayOption={trackerOptions} defaultValue={"Bug"} />
              </Label>
            </div>
            <div className="flex">
              <Label htmlFor="subject" isRequired={true} className="flex gap-1 items-center p-0" name="Subject"></Label>
              <Input id="subject" style={{ width: "calc(100% - 225px)" }} className="ml-2" onChange={(e) => handleChange(e)} value={subject} />
            </div>
            <div className="flex">
              <Label htmlFor="textareaEdit" className="flex gap-1 items-center p-0 pb-[162px]" name="Description"></Label>
              <Editor />
            </div>
            {/* Row 1 */}
            <div className="flex">
              <div className="w-1/2">
                <div className="flex">
                  <Label htmlFor="status" className="flex gap-1 items-center p-0" name="Status" isRequired></Label>
                  <EnhanceSelect
                    id="status"
                    className="text-[13.33px] font-normal text-[black] w-1/3 ml-2"
                    arrayOption={statusOptions}
                    defaultValue={"Bug"}
                  />
                </div>
              </div>
              <div className="w-1/2">
                <div className="flex">
                  <Label htmlFor="ParentTask" className="flex gap-1 items-center p-0 parent-task" name="Parent task"></Label>
                  <div className={`flex items-center border ml-1 w-32 ${isActiveParentTask ? "border-[black] rounded-sm" : ""}`}>
                    <img src={IconSearch} alt="IconSearch" className="px-1" />
                    <input
                      id="ParentTask"
                      type="text"
                      className="outline-none w-full text-xs py-1"
                      onFocus={() => setIsActiveParentTask(true)}
                      onBlur={() => setIsActiveParentTask(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Row 2 */}
            <div className="flex items-center">
              <div className="w-1/2">
                <div className="flex">
                  <Label htmlFor="priority" className="flex gap-1 items-center p-0" name="Priority" isRequired></Label>
                  <EnhanceSelect
                    id="priority"
                    className="text-[13.33px] font-normal text-[black] w-1/3 ml-2"
                    arrayOption={priorityOptions}
                    defaultValue={"Bug"}
                  />
                </div>
              </div>
              <div className="w-1/2">
                <div className="flex">
                  <Label htmlFor="StartDate" className="flex gap-1 items-center p-0" name="Start date"></Label>
                  <DatePickerCustom id="StartDate" className="ml-1" />
                </div>
              </div>
            </div>
            {/* Row 3 */}
            <div className="flex items-center">
              <div className="w-1/2">
                <div className="flex">
                  <Label htmlFor="assignee" className="flex gap-1 items-center p-0" name="Assignee"></Label>
                  <EnhanceSelect
                    id="assignee"
                    className="text-[13.33px] font-normal text-[black] w-1/3 ml-2"
                    arrayOption={assigneeOptions}
                    defaultValue={"Bug"}
                  />
                </div>
              </div>
              <div className="w-1/2">
                <div className="flex">
                  <Label htmlFor="DueDate" className="flex gap-1 items-center p-0" name="Due date"></Label>
                  <DatePickerCustom id="DueDate" className="ml-1" />
                </div>
              </div>
            </div>
            {/* Row 4 */}
            <div className="flex items-center">
              <div className="w-1/2">
                <div className="flex items-center">
                  <Label htmlFor="TargetVersion" className="flex gap-1 items-center p-0" name="Target version"></Label>
                  <EnhanceSelect
                    id="TargetVersion"
                    className="text-[13.33px] font-normal text-[black] w-1/3 ml-2"
                    arrayOption={priorityOptions}
                    defaultValue={"Bug"}
                  />
                  <img src={IconAdd} alt="IconAdd" className="cursor-pointer" onClick={() => setNewVersion(true)} />
                </div>
              </div>
              <div className="w-1/2">
                <div className="flex items-center">
                  <Label htmlFor="EstimateTime" className="flex gap-1 items-center p-0" name="Estimate time"></Label>
                  <Input className="ml-1 w-14" id="EstimateTime" />
                  <span className="text-xs text-[#505050]">Hours</span>
                </div>
              </div>
            </div>
            {/* Row 5 */}
            <div className="flex items-center">
              <div className="w-1/2"></div>
              <div className="w-1/2">
                <div className="flex">
                  <Label htmlFor="done" className="flex gap-1 items-center p-0" name="% Done"></Label>
                  <EnhanceSelect id="done" className="text-[13.33px] font-normal text-[black]" arrayOption={percentDoneOptions} defaultValue={"0%"} />
                </div>
              </div>
            </div>
            {/* Row 6 */}
            <div className="flex items-center">
              <div className="w-1/2">
                <div className="flex">
                  <Label htmlFor="bugType" className="flex gap-1 items-center p-0" name="Bug Type" isRequired></Label>
                  <EnhanceSelect
                    id="bugType"
                    className="text-[13.33px] font-normal text-[black] w-1/3 ml-2"
                    arrayOption={bugTypeOptions}
                    defaultValue={"Others"}
                  />
                </div>
                <div className="flex">
                  <Label htmlFor="severity" className="flex gap-1 items-center p-0" name="Severity" isRequired></Label>
                  <EnhanceSelect
                    id="severity"
                    className="text-[13.33px] font-normal text-[black] w-1/3 ml-2"
                    arrayOption={severityOptions}
                    defaultValue={"Cosmetic"}
                  />
                </div>
                <div className="flex">
                  <Label htmlFor="qcActivity" className="flex gap-1 items-center p-0" name="QC Activity" isRequired></Label>
                  <EnhanceSelect
                    id="qcActivity"
                    className="text-[13.33px] font-normal text-[black] w-1/3 ml-2"
                    arrayOption={qcActivityOptions}
                    defaultValue={"Other Test"}
                  />
                </div>
              </div>
              <div className="w-1/2 h-full">
                <div className="flex h-full">
                  <Label htmlFor="causeCategory" className="flex gap-1 items-center p-0" name="Cause Category" isRequired></Label>
                  <EnhanceSelect
                    id="causeCategory"
                    className="text-[13.33px] font-normal text-[black] h-full"
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
                    className="text-[13.33px] font-normal text-[black] h-full ml-1"
                    arrayOption={isDegradeOptions}
                    defaultValue={0}
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
                  <Input id="reopenCounter" style={{ width: "calc(100% - 225px)" }} className="ml-1" defaultValue={0} />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Label htmlFor="files" className="flex gap-1 items-center p-0" name="Files"></Label>
              <div className="text-[9.6px] text-[#505050] ">
                <input id="files" type="file" className="text-xs" />
                <span>{`(Maximum size: 500MB)`}</span>
              </div>
            </div>
            <div className="flex pt-2 w-full">
              <Label htmlFor="watcher" className="inline-flex gap-1 items-center p-0 " name="Watcher"></Label>
              <div className="flex flex-col h-full">
                <div className="flex items-center text-xs text-[#505050] pl-3 h-full flex-wrap">
                  {members
                    .filter((item) => item.role === "Developer")
                    .map((item) => {
                      return (
                        <div className="flex items-center gap-1 min-w-72 pr-4" key={item.id}>
                          <input type="checkbox" />
                          <span className="">{item.name}</span>
                        </div>
                      );
                    })}
                </div>
                <div className="flex items-center pl-2 text-[9.6px]">
                  <img src={IconBulletAdd} alt="" />
                  <a href="#!" className="link">
                    Search for watchers to add
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center pt-3 gap-1">
            <Button type="button" onClick={handleSubmit}>
              Create
            </Button>
            <Button>Create and continue</Button>
            <a href="#!" className="link">
              Preview
            </a>
          </div>
        </div>
      </form>
    </>
  );
};

export default IssuesCreate;

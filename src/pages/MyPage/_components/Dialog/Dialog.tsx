import React, { useRef, useState } from "react";
import Draggable from "react-draggable";
import { SyncLoader } from "react-spinners";
import issuesApi from "~/apis/issue.api";
import { Issue } from "~/types/issue.type";
import "./Dialog.css";

import Loading from "~/components/Loading";
import { convertDateFormat, getSecondsDifference } from "~/utils/utils";

const Dialog: React.FC<{ issueId: number; content: string }> = ({ issueId = 122712, content = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  const [issue, setIssue] = useState<Issue>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleClickOutside = () => {
    setIsVisible(false);
  };

  const fetchIssue = async () => {
    try {
      setLoading(true);
      const response = await issuesApi.getIssueById({ id: issueId });
      setIssue(response.data.issue);
      setLoading(false);
      setIsVisible(true);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        onClick={() => {
          fetchIssue();
        }}
      >
        {content}
      </div>
      {loading && <Loading />}
      {isVisible && (
        <Draggable>
          <div className="pt-5 pl-5 absolute z-20 " ref={itemRef}>
            <SyncLoader loading={loading} color="#169" size={5} />
            <div className="p-[2px] w-[645px] h-[630px] border-1 rounded-md border-[#e5e7eb] bg-[#eeeeee]">
              <div className="bg-[#fff] z-20 h-[571px] overflow-y-auto">
                <div className="border py-1 px-2 flex justify-between rounded-md title_dialog items-center">
                  <span className="font-bold text-[#fff] text-[13.2px]">
                    Quick View - #{issue?.id} {issue?.subject}
                  </span>
                  <button
                    className="w-5 h-5 icon_close bg-[#f6f6f6] px-2 rounded-sm border-[1px] border-[#ccc] hover:border-[#628db6] "
                    onClick={handleClickOutside}
                    title="Close"
                  ></button>
                </div>
                <div className="mx-3 mt-2 border p-2 text-[#333] text-[13.2px] bg-[#ffffdd]">
                  <div className="flex gap-2">
                    <div className="w-16 h-16 p-1 border bg-[#fff]">
                      <img
                        src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col gap-2 text-left">
                      <h3 className="text-base font-bold text-[#555]">{issue?.subject}</h3>
                      <div className="text-[13.2px] font-light">
                        {"Added by "}
                        <a href="" className="link">
                          {`${issue?.author.name} `}
                        </a>
                        <a href="" className="link">
                          {`${getSecondsDifference(issue?.created_on)} `}
                        </a>
                        ago.
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="flex">
                      <div className="pt-1 w-1/2 flex items-center">
                        <label htmlFor="" className="font-bold w-[45%]">
                          Status:
                        </label>
                        <span className="">{issue?.status.name}</span>
                      </div>
                      <div className="pt-1 w-1/2 flex items-center">
                        <label htmlFor="" className="font-bold w-[45%]">
                          Start date:
                        </label>
                        {issue && issue.start_date && <span className="">{convertDateFormat(issue.start_date)}</span>}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <div className="pt-1 w-1/2 flex items-center">
                        <label htmlFor="" className=" font-bold w-[45%]">
                          Priority:
                        </label>
                        <span>{issue?.priority.name}</span>
                      </div>
                      <div className="pt-1 w-1/2 flex items-center">
                        <label htmlFor="" className="font-bold w-[45%]">
                          Due date:
                        </label>
                        {issue && issue.due_date && <span>{convertDateFormat(issue.due_date)}</span>}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <div className="flex pt-1 w-[50%]">
                        <label htmlFor="" className="font-bold w-[45%]">
                          Assignee:
                        </label>
                        <span className="flex w-[55%]">
                          <div className="min-w-5 w-5 h-5 p-[2px] border mr-1">
                            <img
                              src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
                              alt=""
                              className="object-cover"
                            />
                          </div>
                          <a href="" className="link whitespace-normal">
                            {issue?.assigned_to ? issue?.assigned_to?.name : "-"}
                          </a>
                        </span>
                      </div>

                      <div className="pt-1 w-1/2 inline-flex align-top">
                        <label htmlFor="" className="font-bold w-[45%]">
                          % Done:
                        </label>
                        <div className="gap-1 inline-flex align-top">
                          <div className="whitespace-nowrap inline-block pt-1">
                            <div className="w-[100px] h-5 overflow-hidden bg-[#eeeeee] inline-block align-top">
                              <div className="loading-progress bg-[#b8e0b6] h-full " style={{ width: `${issue?.done_ratio}px` }}></div>
                            </div>
                            <span className="text-xs inline-block align-top pl-2">{issue?.done_ratio}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <div className="pt-1 w-1/2 flex items-center">
                        <label htmlFor="" className="font-bold w-[45%]">
                          Category:
                        </label>
                        <span>-</span>
                      </div>
                      <div className="pt-1 w-1/2 flex items-center">
                        <label htmlFor="" className="font-bold w-[45%]">
                          Estimated time:
                        </label>
                        <span>{issue?.estimated_hours ? `${issue?.estimated_hours} hours` : "-"}</span>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <div className="pt-1 w-1/2 flex items-center">
                        <label htmlFor="" className="font-bold w-[45%]">
                          Target version:
                        </label>
                        <span>-</span>
                      </div>
                      <div className="pt-1 w-1/2 flex">
                        <label htmlFor="" className="font-bold w-[45%]">
                          Spent time:
                        </label>
                        <a href="#!" className="link">
                          {issue?.spent_hours ? `${issue?.spent_hours} hours` : "-"}
                        </a>
                      </div>
                    </div>

                    <div className="flex pb-2 flex-wrap">
                      {issue &&
                        issue.custom_fields &&
                        issue.custom_fields.map((item) => (
                          <div className="pt-1 w-1/2 flex items-center" key={item.id}>
                            <label htmlFor="" className="font-bold w-[45%]">
                              {item.name}:
                            </label>
                            <span>{item.value}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <hr />
                  <div className="py-1 text-left">
                    <label htmlFor="" className="text-[13.2px] text-[#333] font-bold py-1 inline-block">
                      Description
                    </label>
                    <div className="text-[13.2px] text-[#333]">{issue?.description ? issue.description : "description is empty"}</div>
                  </div>
                  <hr className="mt-1" />
                  <div className="flex items-center justify-between">
                    <label htmlFor="" className="py-2 inline-block text-[13.2px] text-[#333] font-bold">
                      Subtasks
                    </label>
                    <a href="" className="link">
                      Add
                    </a>
                  </div>

                  <hr />
                  <div className="flex items-center justify-between">
                    <label htmlFor="" className="py-2 inline-block text-[13.2px] text-[#333] font-bold">
                      Related issues
                    </label>
                    <a href="" className="link">
                      Add
                    </a>
                  </div>
                </div>
                <div className="text-left px-3 py-1 text-mouse-gray">
                  <div className="text-base font-bold pb-1">History</div>
                  <div className="pt-1">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-1">
                        <img
                          src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
                          alt=""
                          className="w-8 h-8"
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

                    <ul className="pl-11 text-[#333] list-disc">
                      <li className="py-3">
                        <span className="text-[13.2px] font-bold">% Done changed</span> from 10 to 70
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <hr className="my-2" />

              <div className="flex gap-2 justify-end pb-[10px] pr-5">
                <button className="border-[1px] text-[#628db6] bg-[#f8f8f8] font-bold px-3 py-1 border-[#ccc] rounded-md hover:bg-[#eff6fe] hover:border-[#628db6]">
                  details
                </button>
                <button className="border-[1px] text-[#628db6] bg-[#f8f8f8] font-bold px-3 py-1 border-[#ccc] rounded-md hover:bg-[#eff6fe] hover:border-[#628db6]">
                  edit
                </button>
                <button
                  className="border-[1px] text-[#628db6] bg-[#f8f8f8] font-bold px-3 py-1 border-[#ccc] rounded-md hover:bg-[#eff6fe] hover:border-[#628db6]"
                  onClick={handleClickOutside}
                >
                  close
                </button>
              </div>
            </div>
          </div>
        </Draggable>
      )}
    </div>
  );
};

export default Dialog;

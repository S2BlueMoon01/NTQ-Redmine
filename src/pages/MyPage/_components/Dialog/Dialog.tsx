import React from "react";

const Dialog = () => {
  return (
    <div className="pt-[20px] pl-[20px]">
      <div className="p-[2px] w-[700px] border-1 rounded-md border-[#e5e7eb] bg-[#eeeeee]">
        <div className="bg-[#fff] z-20 pb-[80px]">
          <div className="border p-2 flex justify-between bg-blue-gray rounded-md">
            <span className="font-extrabold text-[#fff] text-base">Quick View - #122638 Clone Redmine 2</span>
            <button className="font-bold text-blue-gray bg-[#fff] px-2 rounded-md">X</button>
          </div>
          <div className="mx-3 mt-2 border p-2 bg-[#ffffdd]">
            <div className="flex gap-2">
              <div className="w-[80px] h-[80px] p-1 border bg-[#fff]">
                <img
                  src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-5">
                <div className="text-lg	font-bold text-[#555]">Clone Redmine 2</div>
                <div className="text-lg font-light">
                  Added by{" "}
                  <a href="" className="text-[#116699]">
                    Quyet Nguyen Van (Internship) 7 days
                  </a>{" "}
                  ago.
                </div>
              </div>
            </div>
            <div className="">
              <div className="row input flex ">
                <div className="pt-1 w-[50%] flex items-center">
                  <label htmlFor="" className="text-lg font-extrabold w-[45%]">
                    Status:
                  </label>
                  <span>New</span>
                </div>
                <div className="pt-1 w-[50%] flex items-center">
                  <label htmlFor="" className="text-lg font-extrabold w-[45%]">
                    Start date:
                  </label>
                  <span>07/08/2024</span>
                </div>
              </div>

              <div className="row input flex justify-between">
                <div className="pt-1 w-[50%] flex items-center">
                  <label htmlFor="" className="text-lg font-extrabold w-[45%]">
                    Priority:
                  </label>
                  <span>Normal</span>
                </div>
                <div className="pt-1 w-[50%] flex items-center">
                  <label htmlFor="" className="text-lg font-extrabold w-[45%]">
                    Due date:
                  </label>
                  <span>07/13/2024</span>
                </div>
              </div>

              <div className="row input flex justify-between">
                <div className="flex pt-1 w-[50%]">
                  <label htmlFor="" className="text-lg font-extrabold w-[45%]">
                    Assignee:
                  </label>
                  <span className="flex w-[55%]">
                    <div className="w-6 h-6 p-[2px] border">
                      <img
                        src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
                        alt=""
                      />
                    </div>
                    <a href="" className="text-[#116699]">
                      Son (internship) Nguyen Hoang Huu
                    </a>
                  </span>
                </div>

                <div className="pt-1 w-[50%] inline-flex align-top">
                  <label htmlFor="" className="text-lg font-extrabold w-[45%]">
                    % Done:
                  </label>
                  <div className="gap-1 inline-flex align-top">
                    <div className="whitespace-nowrap inline-block pt-1">
                      <div className="w-[100px] h-[20px] overflow-hidden bg-[#eeeeee] inline-block align-top">
                        <div className="loading-progress bg-[#b8e0b6] h-full " style={{ width: `${50}px` }}></div>
                      </div>
                      <span className="text-xs inline-block align-top pl-2">10%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row input flex justify-between">
                <div className="pt-1 w-[50%] flex items-center">
                  <label htmlFor="" className="text-lg font-extrabold w-[45%]">
                    Category:
                  </label>
                  <span>_</span>
                </div>
                <div className="pt-1 w-[50%] flex items-center">
                  <label htmlFor="" className="text-lg font-extrabold w-[45%]">
                    Estimated time:
                  </label>
                  <span>12.00 hours</span>
                </div>
              </div>

              <div className="row input flex justify-between">
                <div className="pt-1 w-[50%] flex items-center">
                  <label htmlFor="" className="text-lg font-extrabold w-[45%]">
                    Target version:
                  </label>
                  <span>_</span>
                </div>
                <div className="pt-1 w-[50%] flex">
                  <label htmlFor="" className="text-lg font-extrabold w-[45%]">
                    Spent time:
                  </label>
                  <span>_</span>
                </div>
              </div>

              <div className="row input flex justify-between pb-2">
                <div className="pt-1 w-[50%] flex items-center">
                  <label htmlFor="" className="text-lg font-extrabold w-[45%]">
                    Severity:
                  </label>
                  <span>Cosmetic</span>
                </div>
              </div>
            </div>

            <hr />
            <div className="py-2">
              <label htmlFor="" className="text-lg font-bold py-2 inline-block">
                Description
              </label>
              <div>Task 2</div>
            </div>
            <hr />
            <div className="flex items-center justify-between">
              <label htmlFor="" className="py-3 inline-block text-lg font-bold">
                Subtasks
              </label>
              <a href="" className="text-[#116699]">
                Add
              </a>
            </div>

            <hr />
            <div className="flex items-center justify-between">
              <label htmlFor="" className="py-3 inline-block text-lg font-bold">
                Related issues
              </label>
              <a href="" className="text-[#116699]">
                Add
              </a>
            </div>
          </div>
        </div>
        <hr className="my-2" />

        <div className="flex gap-2 justify-end pb-[10px] pr-[20px]">
          <button className="text-[#116699] bg-[#fff] font-bold px-3 py-1 border rounded-md">details</button>
          <button className="text-[#116699] bg-[#fff] font-bold px-3 py-1 border rounded-md">edit</button>
          <button className="text-[#116699] bg-[#fff] font-bold px-3 py-1 border rounded-md">close</button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;

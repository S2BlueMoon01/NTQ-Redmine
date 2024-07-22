import React, { useState } from "react";
import useScrollToTop from "~/hooks/useScrollToTop";
import IconAdd from "~/assets/images/icon-add.png";
import IconBack from "~/assets/images/icon-back.png";
import BoardSectionList from "~/components/BoardSectionList";
import Calendar from "./_components/Calendar";
import ReportedIssues from "./_components/ReportedIssues/ReportedIssues";
import IssuesAssigned from "./_components/IssuesAssigned";
import WatchedIssues from "./_components/WatchedIssues";
import SpentTime from "./_components/SpentTime";
import Filter from "./_components/Filter";

const optionBlock = ["Issues assigned to me", "Reported issues", "Watched issues", "Latest news", "Calendar", "Documents", "Spent time"];

const MyPage = () => {
  useScrollToTop();
  const [isShowPersonalize, setIsShowPersonalize] = useState<boolean>(false);
  const [isShowButtonClose, setIsShowButtonClose] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleCloseTablePersonalize = () => {
    alert("Close Personalize");
  };

  const handleShowOptionSelected = () => {
    setIsShowPersonalize(!isShowPersonalize);
    setIsShowButtonClose(!isShowButtonClose);
  };

  const handleClosePersonalize = () => {
    setIsShowPersonalize(!isShowPersonalize);
    setIsShowButtonClose(!isShowButtonClose);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleAddPageBlock = () => {
    console.log(selectedOption);
    alert("Add Page Block " + selectedOption);
  };

  return (
    <>
      <div className="p-2.5 pt-1 flex items-center justify-between">
        <h2 className="text-xl font-semibold pt-0.5 pr-3 mb-3 text-mouse-gray">My page</h2>
        <>
          {isShowPersonalize ? (
            <div className="text-xs text-mouse-gray flex items-center">
              <label>My page block:</label>
              <select className="border border-solid py-1 ml-1" value={selectedOption} onChange={handleSelectChange} defaultValue="">
                <option value="">Select an option</option>
                {optionBlock.length > 0 && optionBlock.map((item) => <option key={item}>{item}</option>)}
              </select>
              <button className="text-ocean-blue ml-2 hover:underline flex" onClick={handleAddPageBlock}>
                <img className="mr-1" src={IconAdd} alt="Add" /> Add
              </button>
              <button className="text-ocean-blue ml-2 hover:underline flex" onClick={handleClosePersonalize}>
                <img className="mr-1" src={IconBack} alt="Back" /> Back
              </button>
            </div>
          ) : (
            <p className="text-ocean-blue text-xs cursor-pointer leading-6 hover:underline" onClick={handleShowOptionSelected}>
              Personalize this page
            </p>
          )}
        </>
      </div>

      <div className="pt-2">
        <div className="grid gap-6 ">
          <Calendar handleOnChange={handleCloseTablePersonalize} isShowButtonClose={isShowButtonClose} />
          <SpentTime handleOnChange={handleCloseTablePersonalize} isShowButtonClose={isShowButtonClose} />
          <WatchedIssues handleOnChange={handleCloseTablePersonalize} isShowButtonClose={isShowButtonClose} />
        </div>

        <div className="mt-6 grid gap-6 grid-cols-2">
          <ReportedIssues handleOnChange={handleCloseTablePersonalize} isShowButtonClose={isShowButtonClose} />
          <IssuesAssigned handleOnChange={handleCloseTablePersonalize} isShowButtonClose={isShowButtonClose} />
        </div>
        <BoardSectionList />
        <Filter />
      </div>
    </>
  );
};

export default MyPage;

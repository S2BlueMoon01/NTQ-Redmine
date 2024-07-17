import React, { useState } from "react";
import useScrollToTop from "~/hooks/useScrollToTop";
import IconAdd from "~/assets/images/icon-add.png";
import IconBack from "~/assets/images/icon-back.png";
import BoardSectionList from "~/components/BoardSectionList";

const optionBlock = ["Issues assigned to me", "Reported issues", "Watched issues", "Latest news", "Calendar", "Documents", "Spent time"];

const MyPage = () => {
  useScrollToTop();
  const [isShowPersonalize, setIsShowPersonalize] = useState<boolean>(false);

  return (
    <>
      <div className="p-2.5 pt-1 flex items-center justify-between ">
        <h2 className="text-xl font-semibold pt-0.5 pr-3 mb-3 text-mouse-gray">My page</h2>
        <>
          {isShowPersonalize ? (
            <div className="text-xs text-mouse-gray flex items-center">
              <label>My page block:</label>
              <select className="border border-solid py-1 ml-1" defaultValue="">
                <option value="">Select an option</option>
                {optionBlock.length > 0 && optionBlock.map((item) => <option key={item}>{item}</option>)}
              </select>
              <button className="text-ocean-blue ml-2 hover:underline flex">
                <img className="mr-1" src={IconAdd} alt="Add" /> Add
              </button>
              <button className="text-ocean-blue ml-2 hover:underline flex" onClick={() => setIsShowPersonalize(!isShowPersonalize)}>
                <img className="mr-1" src={IconBack} alt="Back" /> Back
              </button>
            </div>
          ) : (
            <p className="text-ocean-blue text-xs cursor-pointer leading-6 hover:underline" onClick={() => setIsShowPersonalize(!isShowPersonalize)}>
              Personalize this page
            </p>
          )}
        </>
      </div>
      <div>
        <BoardSectionList />
      </div>
    </>
  );
};

export default MyPage;

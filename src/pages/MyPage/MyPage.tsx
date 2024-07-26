import { useState } from "react";
import IconAdd from "~/assets/images/icon-add.png";
import IconBack from "~/assets/images/icon-back.png";
import BoardSectionList from "~/components/BoardSectionList";
import { optionBlockMyPage } from "~/constants/constants";
import useScrollToTop from "~/hooks/useScrollToTop";
import { useGlobalStore } from "~/store/globalStore";
import { Block } from "~/types/utils.type";

const MyPage = () => {
  useScrollToTop();
  const { isEditMyPage, setIsEditMyPage, addBlockToBoardSections, boardSections } = useGlobalStore((state) => state);

  const [blockSelect, setBlockSelect] = useState<Block | undefined>();

  const selectedIds = new Set<string>();

  if (boardSections) {
    Object.values(boardSections).forEach((board: Block[]) => {
      board.forEach((block) => {
        selectedIds.add(block.id);
      });
    });
  }

  const unselectedBlocks = optionBlockMyPage.filter((block) => !selectedIds.has(block.id));

  const handleAddBlock = (block: Block | undefined) => {
    if (block) {
      setBlockSelect(undefined);
      addBlockToBoardSections({
        block,
        boardId: "Board-1",
      });
    }
  };

  const handleShowOptionSelected = () => {
    setIsEditMyPage(true);
  };

  const handleClosePersonalize = () => {
    setIsEditMyPage(false);
  };

  return (
    <>
      <div className="p-2.5 pt-1 flex items-center justify-between">
        <h2 className="text-xl font-semibold pt-0.5 pr-3 mb-3 text-mouse-gray">My page</h2>
        {isEditMyPage ? (
          <div className="text-xs text-mouse-gray flex items-center">
            <label>My page block:</label>
            <select
              className="border border-solid py-1 ml-1"
              value={blockSelect?.title || ""}
              onChange={(e) =>
                setBlockSelect({
                  id: unselectedBlocks.find((item) => item.title === e.target.value)?.id || Math.random().toString(),
                  title: e.target.value,
                })
              }
            >
              <option value="">Select an option</option>
              {unselectedBlocks.length > 0 &&
                unselectedBlocks.map((item) => (
                  <option value={item.title} key={item.id}>
                    {item.title}
                  </option>
                ))}
            </select>
            <button className="text-ocean-blue ml-2 hover:underline flex" onClick={() => handleAddBlock(blockSelect)}>
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
      </div>

      <BoardSectionList isDragDropEnabled={isEditMyPage} />
    </>
  );
};

export default MyPage;

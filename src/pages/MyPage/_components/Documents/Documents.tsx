import { optionBlockMyPage } from "~/constants/constants";
import { useGlobalStore } from "~/store/globalStore";
import { removeBlockFromBoardSections } from "~/utils/utils";
import CloseImg from "~/assets/images/close-img.png";

const Documents = () => {
  const { isEditMyPage, removeBlock } = useGlobalStore((state) => ({
    isEditMyPage: state.isEditMyPage,
    removeBlock: state.removeBlock,
  }));
  const handleClose = () => {
    const blockId = optionBlockMyPage.find((block) => block.title === "Documents")?.id || "";
    removeBlockFromBoardSections({
      blockId: blockId,
    });
    removeBlock(blockId);
  };
  return (
    <div className="flex justify-between items-center ">
      <h2 className="text-base text-mouse-gray font-bold">Documents</h2>
      {isEditMyPage && <img className="w-fit h-fit mr-3 cursor-pointer" onClick={handleClose} src={CloseImg} alt="closeButton" />}
    </div>
  );
};

export default Documents;

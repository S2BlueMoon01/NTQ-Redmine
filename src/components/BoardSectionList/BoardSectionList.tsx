import React, { useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { flushSync } from "react-dom";
import Board from "./_components/Board";
import BlockItem from "./_components/BlockItem";
import { getBoardSectionsFromLS, isValidBoardSections, setBoardSectionsFromLS } from "~/utils/utils";
import { useGlobalStore } from "~/store/global-store";
import { produce } from "immer";
import { initializeBoard } from "~/utils/board";
import { optionBlockMyPage } from "~/constants/constants";

const BoardSectionList = ({ isDragDropEnabled = false }: { isDragDropEnabled?: boolean }) => {
  const { boardSections, setBoardSections } = useGlobalStore((state) => ({
    boardSections: state.boardSections,
    setBoardSections: state.setBoardSections,
  }));

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    const sourceContainer = source.droppableId;
    const destinationContainer = destination.droppableId;

    flushSync(() => {
      setBoardSections(
        produce(boardSections, (draft) => {
          if (sourceContainer === destinationContainer) {
            const items = Array.from(draft[sourceContainer]);
            const [reorderedItem] = items.splice(source.index, 1);
            items.splice(destination.index, 0, reorderedItem);
            draft[sourceContainer] = items;
          } else {
            const sourceItems = Array.from(draft[sourceContainer]);
            const destinationItems = Array.from(draft[destinationContainer]);
            const [movedItem] = sourceItems.splice(source.index, 1);
            destinationItems.splice(destination.index, 0, movedItem);
            draft[sourceContainer] = sourceItems;
            draft[destinationContainer] = destinationItems;
          }
        }),
      );
    });
  };

  useEffect(() => {
    if (isValidBoardSections(boardSections)) {
      setBoardSectionsFromLS(boardSections);
    }
  }, [boardSections]);

  useEffect(() => {
    const savedSections = getBoardSectionsFromLS();
    if (!savedSections || !isValidBoardSections(savedSections)) {
      setBoardSections(initializeBoard(optionBlockMyPage));
      return;
    }
    setBoardSections(savedSections);
  }, []);

  return (
    <div className="mx-auto pb-4">
      {isDragDropEnabled ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex flex-col w-full gap-4">
            <Board boardId="Board-1" blocks={boardSections["Board-1"]} />
            <div className="grid grid-cols-2 gap-4 overflow-hidden">
              <Board boardId="Board-2" blocks={boardSections["Board-2"]} />
              <Board boardId="Board-3" blocks={boardSections["Board-3"]} />
            </div>
          </div>
        </DragDropContext>
      ) : (
        <div className="flex flex-col w-full gap-4">
          {boardSections["Board-1"]?.length > 0 && (
            <div className="w-full flex flex-col gap-4 p-4 rounded-md shadow-md border-dashed border border-gray-200">
              {boardSections["Board-1"].map((block) => (
                <div key={block.id}>
                  <BlockItem block={block} />
                </div>
              ))}
            </div>
          )}
          <div className="grid grid-cols-2 gap-4 overflow-hidden">
            {boardSections["Board-2"]?.length > 0 && (
              <div className="w-full flex flex-col gap-4 p-4 rounded-md shadow-md border-dashed border border-gray-200">
                {boardSections["Board-2"].map((block) => (
                  <div key={block.id}>
                    <BlockItem block={block} />
                  </div>
                ))}
              </div>
            )}
            {boardSections["Board-3"]?.length > 0 && (
              <div className="w-full flex flex-col gap-4 p-4 rounded-md shadow-md border-dashed border border-gray-200">
                {boardSections["Board-3"].map((block) => (
                  <div key={block.id}>
                    <BlockItem block={block} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardSectionList;

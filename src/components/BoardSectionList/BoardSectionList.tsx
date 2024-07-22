import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { flushSync } from "react-dom";
import { BoardSections as BoardSectionsType } from "~/types/utils.type";
import { initializeBoard } from "~/utils/board";
import Board from "./_components/Board";
import { optionBlockMyPage } from "~/constants/constants";
import BlockItem from "./_components/BlockItem";
import { getBoardSectionsFromLS, setBoardSectionsFromLS } from "~/utils/utils";

const BoardSectionList = ({ isDragDropEnabled = false }: { isDragDropEnabled?: boolean }) => {
  const [boardSections, setBoardSections] = useState<BoardSectionsType>(() => {
    const savedSections = getBoardSectionsFromLS();
    return savedSections ? savedSections : initializeBoard(optionBlockMyPage);
  });

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sourceContainer = source.droppableId;
    const destinationContainer = destination.droppableId;

    flushSync(() => {
      if (sourceContainer === destinationContainer) {
        const items = Array.from(boardSections[sourceContainer]);
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);

        setBoardSections((prev) => ({
          ...prev,
          [sourceContainer]: items,
        }));
      } else {
        const sourceItems = Array.from(boardSections[sourceContainer]);
        const destinationItems = Array.from(boardSections[destinationContainer]);
        const [movedItem] = sourceItems.splice(source.index, 1);
        destinationItems.splice(destination.index, 0, movedItem);

        setBoardSections((prev) => ({
          ...prev,
          [sourceContainer]: sourceItems,
          [destinationContainer]: destinationItems,
        }));
      }
    });
  };

  useEffect(() => {
    setBoardSectionsFromLS(boardSections);
  }, [boardSections]);

  return (
    <div className="mx-auto py-4">
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
          {boardSections["Board-1"].length > 0 && (
            <div className="w-full flex flex-col gap-4 p-4 rounded-md shadow-md border-dashed border border-gray-200">
              {boardSections["Board-1"].map((block) => (
                <div key={block.id}>
                  <BlockItem block={block} />
                </div>
              ))}
            </div>
          )}
          <div className="grid grid-cols-2 gap-4 overflow-hidden">
            {boardSections["Board-2"].length > 0 && (
              <div className="w-full flex flex-col gap-4 p-4 rounded-md shadow-md border-dashed border border-gray-200">
                {boardSections["Board-2"].map((block) => (
                  <div key={block.id}>
                    <BlockItem block={block} />
                  </div>
                ))}
              </div>
            )}
            {boardSections["Board-3"].length > 0 && (
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

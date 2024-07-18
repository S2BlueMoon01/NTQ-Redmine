import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { flushSync } from "react-dom";
import { INITIAL_TASKS } from "~/data/data";
import { BoardSections as BoardSectionsType } from "~/types/utils.type";
import { initializeBoard } from "~/utils/board";
import Board from "./_components/Board";

const BoardSectionList = () => {
  const [boardSections, setBoardSections] = useState<BoardSectionsType>(() => {
    const savedSections = localStorage.getItem("boardSections");
    return savedSections ? JSON.parse(savedSections) : initializeBoard(INITIAL_TASKS);
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
    localStorage.setItem("boardSections", JSON.stringify(boardSections));
  }, [boardSections]);

  return (
    <div className="mx-auto py-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex flex-col w-full gap-4">
          <Board boardId="Board-1" boardTitle="Board 1" tasks={boardSections["Board-1"]} />
          <div className="grid grid-cols-2 gap-4 overflow-hidden">
            <Board boardId="Board-2" boardTitle="Board 2" tasks={boardSections["Board-2"]} />
            <Board boardId="Board-3" boardTitle="Board 3" tasks={boardSections["Board-3"]} />
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default BoardSectionList;

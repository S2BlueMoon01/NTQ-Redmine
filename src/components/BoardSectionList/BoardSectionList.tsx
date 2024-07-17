import React, { useEffect, useState } from "react";
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DndContext,
  closestCorners,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  DragOverlay,
  DropAnimation,
  defaultDropAnimation,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import { BoardSections as BoardSectionsType } from "~/types/utils.type";

import BoardSection from "./_components/BoardSection";
import TaskItem from "./_components/TaskItem";
import { getTaskById } from "~/utils/utils";
import { INITIAL_TASKS } from "~/data/data";
import { findBoardSectionContainer, initializeBoard } from "~/utils/board";

const BoardSectionList = () => {
  const tasks = INITIAL_TASKS;

  const [activeTaskId, setActiveTaskId] = useState<null | string>(null);

  const [boardSections, setBoardSections] = useState<BoardSectionsType>(() => {
    const savedSections = localStorage.getItem("boardSections");
    return savedSections ? JSON.parse(savedSections) : initializeBoard(INITIAL_TASKS);
  });

  useEffect(() => {
    localStorage.setItem("boardSections", JSON.stringify(boardSections));
  }, [boardSections]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveTaskId(active.id as string);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const activeContainer = findBoardSectionContainer(boardSections, active.id as string);
    const overContainer = findBoardSectionContainer(boardSections, over?.id as string);

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }

    setBoardSections((boardSection) => {
      const activeItems = boardSection[activeContainer];
      const overItems = boardSection[overContainer];

      const activeIndex = activeItems.findIndex((item) => item.id === active.id);
      const overIndex = overItems.findIndex((item) => item.id !== over?.id);

      return {
        ...boardSection,
        [activeContainer]: [...boardSection[activeContainer].filter((item) => item.id !== active.id)],
        [overContainer]: [
          ...boardSection[overContainer].slice(0, overIndex),
          boardSections[activeContainer][activeIndex],
          ...boardSection[overContainer].slice(overIndex, boardSection[overContainer].length),
        ],
      };
    });
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    const activeContainer = findBoardSectionContainer(boardSections, active.id as string);
    const overContainer = findBoardSectionContainer(boardSections, over?.id as string);

    if (!activeContainer || !overContainer || activeContainer !== overContainer) {
      return;
    }

    const activeIndex = boardSections[activeContainer].findIndex((task) => task.id === active.id);
    const overIndex = over ? boardSections[overContainer].findIndex((task) => task.id === over.id) : 0;

    if (activeIndex !== overIndex) {
      const updatedTasks = arrayMove(boardSections[overContainer], activeIndex, overIndex);
      setBoardSections((boardSection) => ({
        ...boardSection,
        [overContainer]: updatedTasks,
      }));

      // Lưu vào localStorage
      localStorage.setItem("boardSections", JSON.stringify(boardSections));
    }

    setActiveTaskId(null);
  };

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };

  const task = activeTaskId ? getTaskById(tasks, activeTaskId) : null;
  // const sectionKeys = Object.keys(boardSections);
  // const firstRowSections = sectionKeys.slice(0, 1); // Lấy section đầu tiên cho hàng đầu
  // const secondRowSections = sectionKeys.slice(1, 3); // Lấy hai section tiếp theo cho hàng thứ hai

  return (
    <div className=" mx-auto py-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-col w-full  gap-4">
          {/* {Object.keys(boardSections).map((boardSectionKey) => (
            <div key={boardSectionKey}>
              <BoardSection id={boardSectionKey} title={boardSectionKey} tasks={boardSections[boardSectionKey]} />
            </div>
          ))} */}

          <BoardSection id="Board 1" title="Board 1" tasks={boardSections["Board 1"]} />
          <div className="flex gap-4">
            <BoardSection id="Board 2" title="Board 2" tasks={boardSections["Board 2"]} />
            <BoardSection id="Board 3" title="Board 3" tasks={boardSections["Board 3"]} />
          </div>

          <DragOverlay dropAnimation={dropAnimation}>{task ? <TaskItem task={task} /> : null}</DragOverlay>
        </div>
      </DndContext>
    </div>
  );
};

export default BoardSectionList;

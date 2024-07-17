import { BoardSections, Task } from "~/types/utils.type";

export const initializeBoard = (tasks: Task[]): BoardSections => {
  return {
    "Board 1": tasks.slice(0, 3),
    "Board 2": tasks.slice(3, 6),
    "Board 3": tasks.slice(6, 9),
  };
};

export const findBoardSectionContainer = (boardSections: BoardSections, taskId: string): string | undefined => {
  if (taskId in boardSections) {
    return taskId;
  }
  return Object.keys(boardSections).find((key) => boardSections[key].find((task) => task.id === taskId));
};

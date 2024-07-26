import axios, { AxiosError } from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import ArrowLeftIcon from "~/assets/images/arrow_left.png";
import ArrowRightIcon from "~/assets/images/arrow_right.png";
import DiamondIcon from "~/assets/images/bullet_diamond.png";
import { optionBlockMyPage } from "~/constants/constants";
import HttpStatusCode from "~/constants/httpStatusCode.enum";
import { GroupedIssueByDay, Issue } from "~/types/issue.type";
import { Block, BoardSections, ErrorResponse } from "~/types/utils.type";
import { BoardSections as BoardSectionsType } from "~/types/utils.type";

/**
 * Combines multiple class names into a single string.
 *
 * @param inputs - The class names to be combined.
 * @returns The combined class names as a string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Checks if the given error is an AxiosError.
 * @param error - The error to check.
 * @returns True if the error is an AxiosError, false otherwise.
 */
export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error);
}

/**
 * Checks if the given error is an AxiosError with a response status of UnprocessableEntity.
 * @param error - The error to check.
 * @returns True if the error is an AxiosError with a response status of UnprocessableEntity, false otherwise.
 */
export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity;
}

/**
 * Checks if the given error is an Axios unauthorized error.
 * @param error - The error to check.
 * @returns True if the error is an Axios unauthorized error, false otherwise.
 */
export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized;
}

/**
 * Checks if the given error is an AxiosError with an expired token.
 * @param error - The error to check.
 * @returns True if the error is an AxiosError with an expired token, false otherwise.
 */
export function isAxiosExpiredTokenError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error) && error.response?.data?.data?.name === "EXPIRED_TOKEN";
}

/**
 * Retrieves a task from an array of tasks based on its ID.
 * @param tasks - The array of tasks to search in.
 * @param id - The ID of the task to retrieve.
 * @returns The task object with the specified ID, or undefined if not found.
 */
export const getTaskById = (tasks: Block[], id: string): Block | undefined => {
  return tasks.find((task) => task.id === id);
};

/**
 * Calculates the week number of a given date.
 * @param d - The date for which to calculate the week number.
 * @returns An array containing the year and week number.
 */
export function getWeekNumber(d: Date): number[] {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return [d.getUTCFullYear(), weekNo];
}

/**
 * Checks the status of a date based on the given start date, due date, and day.
 * @param startDate - The start date (optional).
 * @param dueDate - The due date (optional).
 * @param day - The day to check.
 * @returns The status of the date as a string.
 */
export function checkDateStatus({ startDate, dueDate, day }: { startDate: string | undefined; dueDate: string | undefined; day: string }): string {
  if (!startDate && !dueDate) {
    return ArrowRightIcon;
  }

  if (!startDate && !!dueDate) {
    const date = new Date(dueDate).getDate();
    if (date === +day) {
      return ArrowLeftIcon;
    }
  }

  if (!!startDate && !dueDate) {
    const date = new Date(startDate).getDate();
    if (date === +day) {
      return ArrowRightIcon;
    }
  }

  if (!!startDate && !!dueDate) {
    const start = new Date(startDate).getDate();
    const due = new Date(dueDate).getDate();

    if (start !== due && start === +day) {
      return ArrowRightIcon;
    } else if (start !== due && due === +day) {
      return ArrowLeftIcon;
    } else if (start === due && due === +day) {
      return DiamondIcon;
    }
  }

  return ArrowRightIcon;
}

/**
 * Returns an array of dates representing the days of a given week number in the current year.
 * @param weekNumber - The week number.
 * @returns An array of strings representing the dates in the format "YYYY-MM-DD".
 */
export function getWeekDates(weekNumber: number): string[] {
  const dates: string[] = [];
  const year = new Date().getFullYear();

  const firstDayOfYear = new Date(year, 0, 1);
  const firstMondayOfYear = firstDayOfYear;

  while (firstMondayOfYear.getDay() !== 1) {
    firstMondayOfYear.setDate(firstMondayOfYear.getDate() + 1);
  }

  const startOfWeek = new Date(firstMondayOfYear);
  startOfWeek.setDate(firstMondayOfYear.getDate() + (weekNumber - 1) * 7);

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + i);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    dates.push(`${year}-${month}-${day}`);
  }

  return dates;
}

/**
 * Groups tasks by exact date.
 * @param tasks - The array of tasks to be grouped.
 * @param dates - The array of dates to group the tasks by.
 * @returns An array of objects representing the grouped tasks by day.
 */
export function groupTasksByExactDate(tasks: Issue[], dates: string[]): GroupedIssueByDay[] {
  const result = dates.map((date) => {
    const day = new Date(date).getDate();
    const tasksForDate = tasks.filter((task) => {
      const startDate = task.start_date === date;
      const dueDate = task.due_date === date;
      return startDate || dueDate;
    });
    return {
      [day]: tasksForDate,
    };
  });

  return result;
}

/**
 * Gets the current day as a string.
 * @returns The current day as a string.
 */
export function getDay(): string {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  return day;
}

/**
 * Converts a date string from the format "YYYY-MM-DD" to "MM/DD/YYYY".
 * @param dateString - The date string to be converted.
 * @returns The converted date string.
 */
export function convertDateFormat(dateString: string): string {
  const [year, month, day] = dateString.split("-");
  return `${month}/${day}/${year}`;
}

/**
 * Calculates the time difference between the current date and the provided ISO date string.
 * @param isoDateString - The ISO date string to calculate the time difference from.
 * @returns A string representing the time difference in a human-readable format.
 */
export function getSecondsDifference(isoDateString: string | undefined): string {
  let timeAgo = "";

  if (typeof isoDateString === "undefined") {
    return timeAgo;
  } else {
    const inputDate = new Date(isoDateString);
    const currentDate = new Date();
    const differenceInMilliseconds = currentDate.getTime() - inputDate.getTime();
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
    if (differenceInSeconds < 60) {
      timeAgo = "less than a minute";
    } else if (60 < differenceInSeconds && differenceInSeconds < 3600) {
      timeAgo = `${Math.round(differenceInSeconds / 60)} minutes`;
    } else if (3600 < differenceInSeconds && differenceInSeconds < 86400) {
      timeAgo = `${Math.round(differenceInSeconds / 3600)} hours`;
    } else if (86400 < differenceInSeconds && differenceInSeconds < 2592000) {
      timeAgo = `${Math.round(differenceInSeconds / 86400)} days`;
    } else if (2592000 < differenceInSeconds && differenceInSeconds < 31104000) {
      timeAgo = `${Math.round(differenceInSeconds / 2592000)} months`;
    } else if (31104000 < differenceInSeconds) {
      timeAgo = `${Math.round(differenceInSeconds / 31104000)} years`;
    }
  }
  return timeAgo;
}

/**
 * Retrieves the board sections from local storage.
 * @returns A record object containing board sections, or null if the data is invalid.
 */
export const getBoardSectionsFromLS = (): Record<string, Block[]> | null => {
  const data = localStorage.getItem("boardSections");
  const boardSections = JSON.parse(data || "{}");
  const isValid = isValidBoardSections(boardSections);
  return isValid ? boardSections : null;
};

/**
 * Sets the board sections in the local storage.
 * @param boardSections - The board sections to be stored.
 */
export const setBoardSectionsFromLS = (boardSections: BoardSectionsType) => {
  localStorage.setItem("boardSections", JSON.stringify(boardSections));
};

/**
 * Adds a block to the board sections.
 * @param {Object} options - The options for adding the block.
 * @param {Block} options.block - The block to be added.
 * @param {string} options.boardId - The ID of the board.
 */
export const addBlockToBoardSections = ({ block, boardId }: { block: Block; boardId: string }) => {
  const boardSections = getBoardSectionsFromLS();
  const newBoardSections = { ...boardSections };
  newBoardSections[boardId] = [block, ...newBoardSections[boardId]];
  setBoardSectionsFromLS(newBoardSections);
};

/**
 * Removes a block from the board sections.
 * @param {Object} params - The parameters for removing the block.
 * @param {string} params.blockId - The ID of the block to be removed.
 */
export const removeBlockFromBoardSections = ({ blockId }: { blockId: string }) => {
  const boardSections = getBoardSectionsFromLS();
  const newBoardSections = { ...boardSections };
  Object.keys(newBoardSections).forEach((boardId) => {
    newBoardSections[boardId] = newBoardSections[boardId].filter((block) => block.id !== blockId);
  });
  setBoardSectionsFromLS(newBoardSections);
};

/**
 * Retrieves the unselected blocks from the optionBlockMyPage array.
 * Unselected blocks are those that are not present in the localStorageData.
 *
 * @returns An array of unselected blocks.
 */
export const getUnselectedBlocks = (): Block[] => {
  const selectedIds = new Set<string>();
  const localStorageData = getBoardSectionsFromLS();
  if (localStorageData) {
    Object.values(localStorageData).forEach((board: Block[]) => {
      board.forEach((block) => {
        selectedIds.add(block.id);
      });
    });
  }

  return optionBlockMyPage.filter((block) => !selectedIds.has(block.id));
};

/**
 * Checks if the given object is a valid BoardSections object.
 * @param obj - The object to be checked.
 * @returns True if the object is a valid BoardSections object, false otherwise.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isValidBoardSections = (obj: any): obj is BoardSections => {
  const keys = ["Board-1", "Board-2", "Board-3"];

  // Check if the board sections object is an object and has exactly 3 keys
  if (typeof obj !== "object" || obj === null || Object.keys(obj).length !== 3) {
    return false;
  }

  // Check if the key exists in obj and is an array of Block objects
  return keys.every(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (key) => key in obj && Array.isArray(obj[key]) && obj[key].every((item: any) => typeof item.id === "string" && typeof item.title === "string"),
  );
};

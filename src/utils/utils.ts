import axios, { AxiosError } from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import ArrowLeftIcon from "~/assets/images/arrow_left.png";
import ArrowRightIcon from "~/assets/images/arrow_right.png";
import DiamondIcon from "~/assets/images/bullet_diamond.png";
import { optionBlockMyPage } from "~/constants/constants";
import HttpStatusCode from "~/constants/httpStatusCode.enum";
import { GroupedIssueByDay, Issue } from "~/types/issue.type";
import { GroupedTimeEntries, TimeEntriesTable } from "~/types/timeEntries.type";
import { Block, BoardSections, ErrorResponse } from "~/types/utils.type";
import { BoardSections as BoardSectionsType } from "~/types/utils.type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error);
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity;
}

export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized;
}

export function isAxiosExpiredTokenError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error) && error.response?.data?.data?.name === "EXPIRED_TOKEN";
}

export const getTaskById = (tasks: Block[], id: string): Block | undefined => {
  return tasks.find((task) => task.id === id);
};

export function getWeekNumber(d: Date): number[] {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return [d.getUTCFullYear(), weekNo];
}

export function checkDateStatus({ startDate, dueDate, day }: { startDate: string | undefined; dueDate: string | undefined; day: string; }): string {
  let url = ArrowRightIcon;

  if (!startDate && !dueDate) {
    return url;
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
      url = ArrowRightIcon;
    } else if (start !== due && due === +day) {
      url = ArrowLeftIcon;
    } else if (start === due && due === +day) {
      url = DiamondIcon;
    }
  }

  return url;
}

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

export function getDay(): string {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");

  return day;
}

export function convertDateFormat(dateString: string): string {
  const [year, month, day] = dateString.split("-");
  return `${month}/${day}/${year}`;
}

export function getSecondsDifference(isoDateString?: string): string {
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

export const getBoardSectionsFromLS = (): Record<string, Block[]> | null => {
  const data = localStorage.getItem("boardSections");
  const boardSections = JSON.parse(data || "{}");
  const isValid = isValidBoardSections(boardSections);
  return isValid ? boardSections : null;
};

export const setBoardSectionsFromLS = (boardSections: BoardSectionsType) => {
  localStorage.setItem("boardSections", JSON.stringify(boardSections));
};

export const addBlockToBoardSections = ({ block, boardId }: { block: Block; boardId: string }) => {
  const boardSections = getBoardSectionsFromLS();
  const newBoardSections = { ...boardSections };
  newBoardSections[boardId] = [block, ...newBoardSections[boardId]];
  setBoardSectionsFromLS(newBoardSections);
};

export const removeBlockFromBoardSections = ({ blockId }: { blockId: string }) => {
  const boardSections = getBoardSectionsFromLS();
  const newBoardSections = { ...boardSections };
  Object.keys(newBoardSections).forEach((boardId) => {
    newBoardSections[boardId] = newBoardSections[boardId].filter((block) => block.id !== blockId);
  });
  setBoardSectionsFromLS(newBoardSections);
};

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isValidBoardSections = (obj: any): obj is BoardSections => {
  const keys = ["Board-1", "Board-2", "Board-3"];

  // Kiểm tra nếu obj không phải là đối tượng hoặc không có đúng 3 key cần thiết
  if (typeof obj !== "object" || obj === null || Object.keys(obj).length !== 3) {
    return false;
  }

  // Kiểm tra nếu mỗi key tồn tại trong obj và là một mảng các đối tượng Block
  return keys.every(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (key) => key in obj && Array.isArray(obj[key]) && obj[key].every((item: any) => typeof item.id === "string" && typeof item.title === "string"),
  );
};

export const groupTimeEntriesByDate = (entries: TimeEntriesTable[]): GroupedTimeEntries[] => {
  const groupedEntries = entries.reduce<{ [key: string]: GroupedTimeEntries }>((acc, entry) => {
    const date = entry.date;
    if (!acc[date]) {
      acc[date] = { date, entries: [], totalHours: 0 };
    }
    acc[date].entries.push(entry);
    acc[date].totalHours += entry.hours;
    return acc;
  }, {});

  return Object.values(groupedEntries);
};

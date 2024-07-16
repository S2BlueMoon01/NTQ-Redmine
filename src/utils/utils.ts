import axios, { AxiosError } from "axios";
import HttpStatusCode from "~/constants/httpStatusCode.enum";
import { ErrorResponse } from "~/types/utils.type";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import ArrowRightIcon from "~/assets/images/arrow_right.png";
import ArrowLeftIcon from "~/assets/images/arrow_left.png";
import DiamondIcon from "~/assets/images/bullet_diamond.png";
import { GroupedIssueByDay, Issue } from "~/types/issue.type";

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

export function getWeekNumber(d: Date): number[] {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return [d.getUTCFullYear(), weekNo];
}

export function checkDateStatus(startDate: string, dueDate: string): string {
  const start = new Date(startDate);
  const due = new Date(dueDate);
  const today = new Date();
  let url = "";

  if (
    start.getFullYear() === today.getFullYear() &&
    start.getMonth() === today.getMonth() &&
    start.getDate() === today.getDate() &&
    (today.getFullYear() !== due.getFullYear() || today.getMonth() !== due.getMonth() || today.getDate() !== due.getDate())
  ) {
    url = ArrowRightIcon;
    // ArrowRightIcon: start = today
  } else if (
    due.getFullYear() === today.getFullYear() &&
    due.getMonth() === today.getMonth() &&
    due.getDate() === today.getDate() &&
    (today.getFullYear() !== start.getFullYear() || today.getMonth() !== start.getMonth() || today.getDate() !== start.getDate())
  ) {
    // ArrowLeftIcon: due = today

    url = ArrowLeftIcon;
  } else if (
    due.getFullYear() === start.getFullYear() &&
    due.getMonth() === start.getMonth() &&
    due.getDate() === start.getDate() &&
    today.getFullYear() === start.getFullYear() &&
    today.getMonth() === start.getMonth() &&
    today.getDate() === start.getDate()
  ) {
    url = DiamondIcon;
    // DiamondIcon: start = date = today
  }

  return url;
}

export function getWeekDates(): Date[] {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const firstDayOfWeek = new Date(currentDate);

  if (currentDay === 0) {
    firstDayOfWeek.setDate(currentDate.getDate() - 6);
  } else {
    firstDayOfWeek.setDate(currentDate.getDate() - currentDay + 1);
  }

  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

  const dates = [];
  for (let d = new Date(firstDayOfWeek); d <= lastDayOfWeek; d.setDate(d.getDate() + 1)) {
    dates.push(new Date(d));
  }

  return dates;
}

export function arrangeIssue(response: Issue[], dates: string[]): GroupedIssueByDay[] {
  const dateMap: { [key: string]: Issue[] } = response.reduce(
    (acc, item) => {
      const day = item.start_date.split("-")[2];
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(item);
      return acc;
    },
    {} as { [key: string]: Issue[] },
  );

  const result = dates.map((date) => {
    const day = date.split("-")[2];
    return { [day]: dateMap[day] || [] };
  });

  return result;
}

export function getDay(): string {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");

  return day;
}

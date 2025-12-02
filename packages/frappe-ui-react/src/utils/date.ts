import {
  format,
  formatISO,
  isToday,
  isYesterday,
  parseISO,
  startOfWeek,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from "date-fns";

export const Months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const getUTCDateTime = (date: string | Date = ""): Date => {
  if (!date) {
    return parseISO(formatISO(new Date(), { representation: "complete" }));
  }
  if (typeof date == "string") {
    date = new Date(date + "T00:00:00");
  }
  return date;
};

export const getNextDate = (startDate: string, weeks: number) => {
  const start = startOfWeek(getUTCDateTime(startDate), {
    weekStartsOn: 1,
  });

  start.setDate(start.getDate() + weeks * 7);

  return getFormatedDate(start);
};

export const getMonthKey = (dateString: string) => {
  const date = getUTCDateTime(dateString);
  return `${Months[date.getMonth()]} ${
    date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
  }`;
};

export const getMonthYearKey = (dateString: string) => {
  const date = getUTCDateTime(dateString);
  return `${Months[date.getMonth()]} ${date.getFullYear()}`;
};

export const getDayDiff = (startString: string, endString: string): number => {
  const start = getUTCDateTime(startString);
  const end = getUTCDateTime(endString);

  return Math.abs(end.getTime() - start.getTime()) / (1000 * 3600 * 24);
};

export const checkInRange = (
  start: string,
  weeks: number,
  dateString: string
) => {
  const startDate = getFormatedDate(
    startOfWeek(getUTCDateTime(start), {
      weekStartsOn: 1,
    })
  );

  const endDate = getNextDate(startDate, weeks);
  return startDate <= dateString && dateString <= endDate;
};

export const getFormatedDate = (date: string | Date): string => {
  date = getUTCDateTime(date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getTodayDate = (): string => {
  const today = new Date();
  return getFormatedDate(today);
};

export const prettyDate = (dateString: string, isLong: boolean = false) => {
  const date = getUTCDateTime(dateString);
  const month = date.toLocaleString("default", { month: "short" });
  const dayOfMonth = date.getDate();
  const dayOfWeek = date.toLocaleString("default", {
    weekday: !isLong ? "short" : "long",
  });
  return { date: `${month} ${dayOfMonth}`, day: dayOfWeek };
};

export const getDateFromDateAndTimeString = (
  dateTimeString: string
): string => {
  // Split the date and time parts exa: '2024-05-08 00:00:00'
  const parts = dateTimeString.split(" ");
  return parts[0];
};

export const normalizeDate = (date: string): string => {
  const parts = date.split("-");
  if (parts.length === 3) {
    let [year, month, day] = parts;
    if (year.length < 4) {
      year = getUTCDateTime().getFullYear().toString();
    }
    if (month.length === 1) {
      month = `0${month}`;
    }
    if (day.length === 1) {
      day = `0${day}`;
    }
    return `${year}-${month}-${day}`;
  }
  return getFormatedDate(getUTCDateTime());
};

export const getDisplayDate = (date: Date): string => {
  const utcDate = getUTCDateTime(date);
  if (isToday(utcDate)) return "Today";
  if (isYesterday(utcDate)) return "Yesterday";
  return format(utcDate, "MMM d");
};

export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const now = new Date();

  const diffMins = differenceInMinutes(now, dateObj);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;

  const diffHours = differenceInHours(now, dateObj);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = differenceInDays(now, dateObj);
  if (diffDays < 7) return `${diffDays}d ago`;

  return format(dateObj, "P");
};
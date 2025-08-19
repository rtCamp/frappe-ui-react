import { dayjs } from "../../utils/dayjs";

type DateConstructorParam = string | number | Date;

export function getDate(...args: DateConstructorParam[]) {
  // JS Date works with: year, monthIndex, date
  return new Date(...(args as [DateConstructorParam]));
}

export function getDateValue(date: Date | string) {
  if (!date || date.toString() === "Invalid Date") return "";
  // If input has time, preserve it, else return date only
  const d = dayjs(date);
  if (
    d.hour() !== 0 ||
    d.minute() !== 0 ||
    d.second() !== 0 ||
    d.millisecond() !== 0
  ) {
    return d.format("YYYY-MM-DD HH:mm:ss");
  }
  return d.format("YYYY-MM-DD");
}

export function getDateTimeValue(date: Date | string) {
  if (!date || date.toString() === "Invalid Date") return "";
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
}

export function getDatesAfter(date: Date, count: number) {
  let incrementer = 1;
  if (count < 0) {
    incrementer = -1;
    count = Math.abs(count);
  }
  const dates: Date[] = [];
  while (count) {
    date = getDate(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + incrementer
    );
    dates.push(date);
    count--;
  }
  if (incrementer === -1) {
    return dates.reverse();
  }
  return dates;
}

export function getDaysInMonth(monthIndex: number, year: number) {
  const daysInMonthMap = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const daysInMonth = daysInMonthMap[monthIndex];
  if (monthIndex === 1 && isLeapYear(year)) {
    return 29;
  }
  return daysInMonth;
}

export function isLeapYear(year: number) {
  if (year % 400 === 0) return true;
  if (year % 100 === 0) return false;
  if (year % 4 === 0) return true;
  return false;
}

import dayjs, { isDayjs } from "dayjs";
import type { CalendarEvent, ColorMap } from "./types";

export function getCalendarDates(month: number, year: number): Date[] {
  const daysInMonth: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const firstDay = new Date(year, month, 1);
  const leftPadding: number = firstDay.getDay();

  const datesInPreviousMonth: Date[] = getBeforeDates(firstDay, leftPadding);
  const datesInCurrentMonth: Date[] = getCurrentMonthDates(firstDay);
  const datesTillNow: Date[] = [...datesInPreviousMonth, ...datesInCurrentMonth];
  const datesInNextMonth: Date[] = getNextMonthDates(datesTillNow);

  const allDates: Date[] = [...datesTillNow, ...datesInNextMonth];

  return allDates;

  function getCurrentMonthDates(date: Date): Date[] {
    const currentMonth: number = date.getMonth();
    if (currentMonth === 1 && isLeapYear(date)) {
      daysInMonth[currentMonth] = 29;
    }

    const numberOfDays: number = daysInMonth[currentMonth];
    const allDates: Date[] = getDatesAfter(new Date(date.getFullYear(), date.getMonth(), 1), 0, numberOfDays);
    return allDates;
  }

  function getBeforeDates(firstDay: Date, leftPadding: number): Date[] {
    const allDates: Date[] = [];
     for (let i = 0; i < leftPadding; i++) {
        allDates.push(new Date(firstDay.getFullYear(), firstDay.getMonth(), 0 - i));
    }
    return allDates.reverse();
  }

  function getNextMonthDates(currentAndPreviousMonthDates: Date[]): Date[] {
    const numberofDaysInCalendar: number = currentAndPreviousMonthDates.length > 35 ? 42 : 35;
    const lengthOfDates: number = currentAndPreviousMonthDates.length;
    const lastDate: Date = currentAndPreviousMonthDates[lengthOfDates - 1];
    const diff: number = numberofDaysInCalendar - lengthOfDates;

    const allDates: Date[] = getDatesAfter(lastDate, 1, diff + 1);
    return allDates;
  }

  function getDatesAfter(date: Date, startIndex: number, counter: number): Date[] {
    const allDates: Date[] = [];
    for (let index = startIndex; index < counter; index++) {
        allDates.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() + index));
    }
    return allDates;
  }


  function isLeapYear(date: Date): boolean {
    const year: number = date.getFullYear();
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
  }
}

export function groupBy<T>(obj: T[], fn: (item: T) => string): { [key: string]: T[] } {
  if (typeof fn !== 'function') throw new Error(`${fn} should be a function`);
  return obj.reduce((acc, item) => {
    const group = fn(item);
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(item);
    return acc;
  }, {} as { [key: string]: T[] });
}

export function calculateMinutes(time: string): number {
  const [hours, minutes] = time.split(':');
  return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
}

export function convertMinutesToHours(minutes: number): string {
  let hours: number | string = Math.floor(minutes / 60);
  let remainingMinutes: number | string = minutes % 60;
  if (hours < 10) hours = `0${hours}`;
  if (remainingMinutes < 10) remainingMinutes = `0${remainingMinutes}`;
  return `${hours}:${remainingMinutes}:00`;
}

export function parseDate(date: string | Date): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  date = isDayjs(date) ? dayjs(date).toDate() : date
  let dd: number | string = date.getDate() as number;
  let mm: number | string = date.getMonth() + 1 as number;
  const yyyy: number = date.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }

  return `${yyyy}-${mm}-${dd}`;
}

export function parseDateEventPopupFormat(
  date: Date,
  showDay: boolean = true,
  showMonth: boolean = true,
  weekDay: 'short' | 'long' | 'narrow' = 'short',
): string {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
  };
  if (showMonth) {
    options.month = 'short';
  }

  if (showDay) {
    options.weekday = weekDay;
  }
  return date.toLocaleDateString('en-US', options);
}

export function parseDateWithComma(date: Date, showDay: boolean = false): string {
  return parseDateEventPopupFormat(date, showDay).split(' ').join(', ');
}

export function parseDateWithDay(date: Date, fullDay: boolean = false): string {
  return fullDay
    ? daysListFull[date.getDay()] + ', ' + date.getDate()
    : daysList[date.getDay()] + ' ' + date.getDate();
}

export function calculateDiff(from: string, to: string): number {
  const fromMinutes = calculateMinutes(from);
  const toMinutes = calculateMinutes(to);
  return toMinutes - fromMinutes;
}

export function handleSeconds(time: string): string {
  return time.split(':').slice(0, 2).join(':') + ':00';
}

export function findOverlappingEventsCount(events: CalendarEvent[]): (CalendarEvent & { hallNumber: number; idx: number })[] {
  events = events.sort((a, b) => a.startTime - b.startTime);

  const result: CalendarEvent[][] = [];

  for (const event of events) {
    const availableHall = result.find(
      (hall) => hall[hall.length - 1].endTime <= event.startTime,
    );

    if (availableHall) {
      availableHall.push(event);
    } else {
      result.push([event]);
    }
  }

  return result
    .map((hall, idx) =>
      hall.map((event, eventIdx) => ({
        ...event,
        hallNumber: idx,
        idx: eventIdx,
      })),
    )
    .flat();
}

export const monthList: string[] = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December',
];

export const daysList: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const daysListFull: string[] = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
];
export const twelveHoursFormat: string[] = [
  '12 am', '1 am', '2 am', '3 am', '4 am', '5 am', '6 am', '7 am', '8 am', '9 am', '10 am', '11 am',
  '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm', '9 pm', '10 pm', '11 pm',
];
export const twentyFourHoursFormat: string[] = [
  '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00',
  '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
  '20:00', '21:00', '22:00', '23:00',
];

export const colorMap: ColorMap = {
  blue: { background_color: 'bg-surface-blue-2', border_color: 'border-surface-blue-3' },
  green: { background_color: 'bg-surface-green-2', border_color: 'border-surface-green-3' },
  red: { background_color: 'bg-surface-red-3', border_color: 'border-surface-red-4' },
  orange: { background_color: 'bg-surface-orange-1', border_color: 'border-surface-orange-2' },
  yellow: { background_color: 'bg-surface-yellow-1', border_color: 'border-surface-yellow-2' },
  teal: { background_color: 'bg-surface-teal-1', border_color: 'border-surface-teal-2' },
  violet: { background_color: 'bg-surface-violet-1', border_color: 'border-surface-violet-2' },
  cyan: { background_color: 'bg-surface-cyan-1', border_color: 'border-surface-cyan-2' },
  purple: { background_color: 'bg-surface-purple-1', border_color: 'border-surface-purple-2' },
  pink: { background_color: 'bg-surface-pink-1', border_color: 'border-surface-pink-2' },
  amber: { background_color: 'bg-surface-amber-1', border_color: 'border-surface-amber-3' },
};

export function formattedDuration(from_time: string, to_time: string, timeFormat: '12h' | '24h'): string {
  from_time = formatTime(from_time, timeFormat);
  to_time = formatTime(to_time, timeFormat);
  return `${from_time} - ${to_time}`;
}

export function formatTime(time: string, format: '12h' | '24h'): string {
  if (format === '12h') {
    const [hoursStr, minutes] = time.split(':');
    let hours = parseInt(hoursStr, 10);
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;

    if (minutes === '00') {
      return `${hours} ${ampm}`;
    }
    return `${hours}:${minutes} ${ampm}`;
  }
  return time;
}

export function sortMonthlyEvents(events: CalendarEvent[]) {
  const fullDayEvents = events.filter((event) => event.isFullDay)
  const timedEvents = events
    .filter((event) => !event.isFullDay)
    .sort((a, b) =>
      a.fromTime !== b.fromTime
        ? calculateMinutes(a.fromTime) > calculateMinutes(b.fromTime)
          ? 1
          : -1
        : calculateMinutes(a.toTime) > calculateMinutes(b.toTime)
          ? 1
          : -1,
    )

  return [...fullDayEvents, ...timedEvents]
}

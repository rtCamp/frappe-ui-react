import { formatISO, parseISO } from "date-fns";

export const getUTCDateTime = (date: string | Date = ""): Date => {
  if (!date) {
    return parseISO(formatISO(new Date(), { representation: "complete" }));
  }
  if (typeof date == "string") {
    date = new Date(date + "T00:00:00");
  }
  return date;
};

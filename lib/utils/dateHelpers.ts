import { format } from "date-fns";

// Helper to get today's date in YYYY-MM-DD format
export const getTodayDateString = (): string => {
  return format(new Date(), "yyyy-MM-dd");
};

// Helper to format date to YYYY-MM-DD string
export const formatDateToString = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};

// Helper to get current time in HH:MM format
export const getCurrentTimeString = (): string => {
  return format(new Date(), "HH:mm");
};

// Helper to parse date string back to Date object
export const parseDateString = (dateString: string): Date => {
  return new Date(dateString + "T00:00:00");
};

// Helper to get date range for medication adherence
export const getDateRange = (days: number) => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - days);

  return {
    startDate: formatDateToString(startDate),
    endDate: formatDateToString(endDate),
  };
};

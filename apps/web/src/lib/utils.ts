import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const timeInMs = {
  seconds: 1000,
  minutes: 60 * 1000,
  hours: 60 * 60 * 1000,
  days: 24 * 60 * 60 * 1000,
  weeks: 7 * 24 * 60 * 60 * 1000,
  months: 30 * 24 * 60 * 60 * 1000,
  years: 365 * 24 * 60 * 60 * 1000,
};

// How long time ago - high to low
export function timeAgo(date: Date) {
  const thisDate = new Date(date);
  const now = new Date();
  const seconds = Math.floor(now.getTime() - thisDate.getTime());

  if (seconds > timeInMs.months) {
    const months = Math.floor(seconds / timeInMs.months);
    return months === 1 ? `${months} month` : `${months} months`;
  } else if (seconds > timeInMs.weeks) {
    const weeks = Math.floor(seconds / timeInMs.weeks);
    return weeks === 1 ? `${weeks} week` : `${weeks} weeks`;
  } else if (seconds > timeInMs.days) {
    const days = Math.floor(seconds / timeInMs.days);
    return days === 1 ? `${days} day` : `${days} days`;
  } else if (seconds > timeInMs.hours) {
    const hours = Math.floor(seconds / timeInMs.hours);
    return hours === 1 ? `${hours} hour` : `${hours} hours`;
  } else if (seconds > timeInMs.minutes) {
    const minutes = Math.floor(seconds / timeInMs.minutes);
    return minutes === 1 ? `${minutes} minute` : `${minutes} minutes`;
  } else {
    const sec = Math.floor(seconds);
    return sec > 1 ? `${sec} seconds` : `Just now`;
  }
}

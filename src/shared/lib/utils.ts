import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function shortenEmail(email: string, maxLocalLength = 6): string {
  const [localPart, domain] = email.split("@");
  if (localPart.length <= maxLocalLength) return email;

  const shortenedLocal = `${localPart.slice(0, maxLocalLength)}..${localPart.slice(-1)}`;
  return `${shortenedLocal}@${domain}`;
}

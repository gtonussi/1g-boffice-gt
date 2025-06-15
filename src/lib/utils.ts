import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getHashPage(): number {
  const hash = window.location.hash.replace("#", "");
  const page = parseInt(hash, 10);
  return isNaN(page) || page < 1 ? 1 : page;
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserToken() {
  const token = localStorage.getItem("auth_token");
  return token;
}

export function getGuestToken() {
  const token = localStorage.getItem("guest_auth_token");
  return token;
}

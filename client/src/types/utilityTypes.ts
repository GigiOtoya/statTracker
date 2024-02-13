export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type Point = {
  x: number;
  y: number;
};

export const buttonTypes = [
  "btn-positive",
  "btn-positive large",
  "btn-negative",
  "btn-negative large",
  "btn-neutral",
  "btn-neutral large",
  "btn-clear",
  "btn-clear large",
] as const;

export type ButtonType = (typeof buttonTypes)[number];

export type Message = {
  type?: "success" | "error";
  message: string;
};

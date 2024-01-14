export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type Point = {
  x: number;
  y: number;
};

export const buttonTypes = ["btn-positive", "btn-negative"];
export type ButtonType = (typeof buttonTypes)[number];

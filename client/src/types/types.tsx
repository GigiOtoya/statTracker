export type Player = {
  number: number;
  firstName?: string;
  lastName?: string;
  position?: string;
  pace?: number;
  shot?: number;
  physical?: number;
  defending?: number;
  dribble?: number;
  passing?: number;
  vision?: number;
  height?: string;
  weight?: number;
};

export const buttonTypes = ["btn-positive", "btn-negative"];

export type ButtonType = (typeof buttonTypes)[number];

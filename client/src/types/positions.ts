import { Coordinates } from "./utilityTypes";

export const positionList = [
  "GK",
  "LB",
  "CB",
  "RB",
  "LM",
  "CM",
  "RM",
  "LW",
  "RW",
  "ST",
  "CF",
] as const;

export type Positions = (typeof positionList)[number];
export type PositionsConfig = {
  [K in Positions]?: Coordinates[];
};

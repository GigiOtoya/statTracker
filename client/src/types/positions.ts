import { Formation } from "./formations";
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

// check if return position from getEquivalentPosition is in formation in use. If it is use that. otherwise assign a random open position.

// Instructions:
// 1) pass starters = [p1, p2, ..., pn] to FieldSVG;
// 2) update formation coordinates when removing player;
// 3) keep object of used positions;

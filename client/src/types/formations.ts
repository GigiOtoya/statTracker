import { PositionsConfig } from "./positions";
import { width, height } from "../utils/presets";
export const formationList = ["4-4-2", "4-3-3"] as const;

type Formation = {
  name: string;
  description?: string;
  positions: PositionsConfig;
};

export type formationsConfig = {
  [K in (typeof formationList)[number]]: Formation;
};

export const formations: formationsConfig = {
  "4-4-2": {
    name: "4-4-2",
    description: "Standard formation with 4 defenders, 4 midfielders, and 2 forwards",
    positions: {
      GK: [{ x: width / 2, y: height - 120 }],
      LB: [{ x: width * 0.1, y: height * 0.25 }],
      CB: [
        { x: width * 0.5, y: height * 0.15 },
        { x: width * 0.25, y: height * 0.15 },
      ],
      RB: [{ x: width * 0.75, y: height * 0.25 }],
      LM: [{ x: width * 0.1, y: height * 0.6 }],
      CM: [
        { x: width * 0.5, y: height * 0.5 },
        { x: width * 0.25, y: height * 0.5 },
      ],
      RM: [{ x: width * 0.75, y: height * 0.6 }],
      ST: [
        { x: width * 0.4, y: height * 0.85 },
        { x: width * 0.6, y: height * 0.85 },
      ],
    },
  },
  "4-3-3": {
    name: "4-4-3",
    description: "Standard formation with 4 defenders, 3 midfielders, and 3 forwards",
    positions: {},
  },
};

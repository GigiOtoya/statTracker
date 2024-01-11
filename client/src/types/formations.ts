import { Positions, PositionsConfig, positionList } from "./positions";
import { width, height } from "../utils/presets";
import { Player } from "./teamTypes";

export const formationList = ["4-4-2", "4-3-3"] as const;
export type Formations = (typeof formationList)[number];

export type Formation = {
  name: Formations;
  description?: string;
  positions: PositionsConfig;
  players: { [key in keyof PositionsConfig]: Player[] };
};

export type formationsConfig = {
  [K in Formations]: Formation;
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
    players: {},
  },
  "4-3-3": {
    name: "4-3-3",
    description: "Standard formation with 4 defenders, 3 midfielders, and 3 forwards",
    positions: {
      GK: [{ x: width / 2, y: height - 120 }],
      LB: [{ x: width * 0.1, y: height * 0.25 }],
      CB: [
        { x: width * 0.5, y: height * 0.15 },
        { x: width * 0.25, y: height * 0.15 },
      ],
      RB: [{ x: width * 0.75, y: height * 0.25 }],
      CM: [
        { x: width * 0.2, y: height * 0.5 },
        { x: width * 0.5, y: height * 0.5 },
        { x: width * 0.8, y: height * 0.5 },
      ],
      LM: [{ x: width * 0.2, y: height * 0.8 }],
      LW: [{ x: width * 0.2, y: height * 0.8 }],
      RM: [{ x: width * 0.8, y: height * 0.8 }],
      RW: [{ x: width * 0.8, y: height * 0.8 }],
      ST: [{ x: width * 0.5, y: height * 0.85 }],
    },
    players: {},
  },
};

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

type Positions442 = WithRequired<
  PositionsConfig,
  "GK" | "LB" | "CB" | "RB" | "CM" | "LM" | "RM" | "ST"
>;

const vacantPositions: Positions[] = Object.keys(formations["4-4-2"].positions).filter(
  (key) => formations["4-4-2"].positions[key as Positions]
) as Positions[];

const initPlayers = (formationName: Formations) => {
  const selectedFormation = formations[formationName];
  const formationPositions = formations[formationName].positions;
  const vacantPositions: Positions[] = Object.keys(formationPositions) as Positions[];

  const players: { [key in keyof PositionsConfig]: Player[] } = {};

  vacantPositions.forEach((key) => (players[key] = []));

  // console.log(selectedFormation.players);
  return players;

  // return vacantPositions;
};

console.log(vacantPositions);

for (const key of formationList) {
  formations[key].players = initPlayers(key);
}

console.log(formations);

const form = formations["4-3-3"];
const vax: Set<Positions> = new Set(Object.keys(form.positions) as Positions[]);
console.log(vax);

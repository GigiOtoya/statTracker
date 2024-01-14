import { Positions, PositionsConfig } from "./positions";
import { width, height } from "../utils/presets";
import { Player } from "./teamTypes";

export const formationList = ["4-4-2", "4-3-3", "3-4-3"] as const;
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
      GK: [{ x: width / 2, y: height - 140 }],
      LB: [{ x: width * 0.1, y: height * 0.75 }],
      CB: [
        { x: width * 0.35, y: height * 0.82 },
        { x: width * 0.65, y: height * 0.82 },
      ],
      RB: [{ x: width * 0.9, y: height * 0.75 }],
      LM: [{ x: width * 0.15, y: height * 0.4 }],
      CM: [
        { x: width * 0.35, y: height * 0.5 },
        { x: width * 0.65, y: height * 0.5 },
      ],
      RM: [{ x: width * 0.85, y: height * 0.4 }],
      ST: [
        { x: width * 0.35, y: height * 0.15 },
        { x: width * 0.65, y: height * 0.15 },
      ],
    },
    players: {},
  },
  "4-3-3": {
    name: "4-3-3",
    description: "Standard formation with 4 defenders, 3 midfielders, and 3 forwards",
    positions: {
      GK: [{ x: width / 2, y: height - 140 }],
      LB: [{ x: width * 0.1, y: height * 0.75 }],
      CB: [
        { x: width * 0.35, y: height * 0.82 },
        { x: width * 0.65, y: height * 0.82 },
      ],
      RB: [{ x: width * 0.9, y: height * 0.75 }],
      CM: [
        { x: width * 0.3, y: height * 0.5 },
        { x: width * 0.5, y: height * 0.6 },
        { x: width * 0.7, y: height * 0.5 },
      ],
      LW: [{ x: width * 0.2, y: height * 0.25 }],
      RW: [{ x: width * 0.8, y: height * 0.25 }],
      ST: [{ x: width * 0.5, y: height * 0.15 }],
    },
    players: {},
  },
  "3-4-3": {
    name: "3-4-3",
    description: "Standard formation with 4 defenders, 3 midfielders, and 3 forwards",
    positions: {
      GK: [{ x: width / 2, y: height - 140 }],
      LB: [{ x: width * 0.2, y: height * 0.75 }],
      CB: [{ x: width * 0.5, y: height * 0.82 }],
      RB: [{ x: width * 0.8, y: height * 0.75 }],
      CM: [
        { x: width * 0.5, y: height * 0.6 },
        { x: width * 0.5, y: height * 0.4 },
      ],
      LM: [{ x: width * 0.25, y: height * 0.5 }],
      RM: [{ x: width * 0.75, y: height * 0.5 }],
      LW: [{ x: width * 0.2, y: height * 0.25 }],
      RW: [{ x: width * 0.8, y: height * 0.25 }],
      ST: [{ x: width * 0.5, y: height * 0.15 }],
    },
    players: {},
  },
};

// type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

// type Positions442 = WithRequired<
//   PositionsConfig,
//   "GK" | "LB" | "CB" | "RB" | "CM" | "LM" | "RM" | "ST"
// >;

// const vacantPositions: Positions[] = Object.keys(formations["4-4-2"].positions).filter(
//   (key) => formations["4-4-2"].positions[key as Positions]
// ) as Positions[];

const initPlayers = (formationName: Formations) => {
  const formationPositions = formations[formationName].positions;
  const vacantPositions: Positions[] = Object.keys(formationPositions) as Positions[];
  const players: { [key in keyof PositionsConfig]: Player[] } = {};

  vacantPositions.forEach((key) => (players[key] = []));

  return players;
};

for (const key of formationList) {
  formations[key].players = initPlayers(key);
}

// const players: Player[] = mockdata
//   .filter((player) => player.starter)
//   .map((player) => ({
//     ...player,
//     position: player.position as Positions,
//   }));

// console.log(playersToPositions(players, "4-4-2"));

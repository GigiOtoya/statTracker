export interface Item {
  id: number;
  name: string;
}

export interface Squad {
  id?: number;
  name: string;
  players: Player[];
}

export type Player = {
  id?: number;
  number: number;
  firstName?: string;
  lastName?: string;
  position?: string;
  speed?: number;
  shooting?: number;
  physical?: number;
  defending?: number;
  dribbling?: number;
  passing?: number;
  vision?: number;
};

export const defaultPlayer: Player = {
  number: 1,
  firstName: "",
  lastName: "",
  position: "",
  speed: 1,
  shooting: 1,
  physical: 1,
  defending: 1,
  dribbling: 1,
  passing: 1,
  vision: 1,
};

export const positions = {
  GK: "GK",
  LB: "LB",
  CB: "CB",
  RB: "RB",
  LM: "LM",
  CM: "CM",
  RM: "RM",
  LW: "LW",
  RW: "RW",
  ST: "ST",
  CF: "CF",
};

export const playerData = Object.keys(defaultPlayer).reduce((name, key) => {
  name[key as keyof Player] = key as keyof Player;
  return name;
}, {} as Record<keyof Player, keyof Player>);

export const buttonTypes = ["btn-positive", "btn-negative"];

export type ButtonType = (typeof buttonTypes)[number];

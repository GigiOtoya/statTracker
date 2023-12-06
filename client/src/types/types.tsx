export type Squad = {
  name: string;
  players?: Player[];
};

export type Player = {
  number: number;
  firstName?: string;
  lastName?: string;
  position?: string;
  speed?: number;
  shooting?: number;
  physical?: number;
  defending?: number;
  dribble?: number;
  passing?: number;
  vision?: number;
  height?: string;
  weight?: number;
};

export const defaultPlayer: Player = {
  number: 0,
  firstName: "",
  lastName: "",
  position: "",
  speed: 0,
  shooting: 0,
  physical: 0,
  defending: 0,
  dribble: 0,
  passing: 0,
  vision: 0,
};

export const playerData = Object.keys(defaultPlayer).reduce((name, key) => {
  name[key as keyof Player] = key as keyof Player;
  return name;
}, {} as Record<keyof Player, keyof Player>);

export const buttonTypes = ["btn-positive", "btn-negative"];

export type ButtonType = (typeof buttonTypes)[number];

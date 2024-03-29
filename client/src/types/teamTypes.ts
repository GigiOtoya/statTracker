import { Positions } from "./positions";
import { Omit, Point } from "./utilityTypes";

export interface Squad {
  id: number;
  name: string;
}

export type NewSquad = Omit<Squad, "id">;

export interface Player {
  id?: number;
  number: number;
  firstName?: string;
  lastName?: string;
  position?: Positions;
  starter: boolean;
  speed?: number;
  shooting?: number;
  physical?: number;
  defending?: number;
  dribbling?: number;
  passing?: number;
  vision?: number;
}

export type MutablePlayerProperties = Partial<Omit<Player, "id">>;

export const defaultPlayer: Player = {
  number: 1,
  firstName: "",
  lastName: "",
  position: undefined,
  starter: false,
  speed: 1,
  shooting: 1,
  physical: 1,
  defending: 1,
  dribbling: 1,
  passing: 1,
  vision: 1,
};

export const playerData = Object.keys(defaultPlayer).reduce((name, key) => {
  name[key as keyof Player] = key as keyof Player;
  return name;
}, {} as Record<keyof Player, keyof Player>);

import { InfoBoxMessage } from "../types/utilityTypes";

export const width = 1600;
export const height = 2560;

export const viewbox = { minx: 0, miny: 0, width: width, height: height };

export const messages: { [k: string]: InfoBoxMessage } = {
  squadUnselected: {
    title: "No squad chosen.",
    body: "Select a squad to view and manage players.",
  },
  squadListEmpty: {
    title: "Squad list is empty.",
    body: "Create a new squad to begin managing players.",
  },
  playerListEmpty: {
    title: "Player list is empty.",
    body: "Create a new player to add to the chosen squad.",
  },
  serverError: {
    title: "Server Error",
    body: "Couldn't retrieve squad data.",
  },
};

export const storageKeys = ["selectedSquad", "selectedFormation"];

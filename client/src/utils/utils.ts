import { formations, Formations, Formation } from "../types/formations";
import { Player } from "../types/teamTypes";
import { Positions } from "../types/positions";

export const alternativePosition: Record<string, Positions[]> = {
  LW: ["LM"],
  LM: ["LW"],
  RW: ["RM", "CM"],
  RM: ["RW", "CM"],
  ST: ["CF"],
  CF: ["ST", "CM"],
};

const getAlternativePosition = (position: Positions, formation: Formation): Positions => {
  const positions = alternativePosition[position] ?? [];

  for (const pos of positions) {
    if (formation.positions[pos]) {
      return pos;
    }
  }

  return position;
};

const isPositionAvailable = (position: Positions, formation: Formation): Boolean => {
  const positionList = formation.positions[position];
  const playerList = formation.players[position];

  if (!positionList) {
    return false;
  }

  if (!playerList) {
    return true;
  }

  return playerList.length < position.length;
};

const positionIsValidated = (position: Positions, formation: Formation): Boolean => {
  return position in formation.players;
};

const positionsAreFull = (position: Positions, formation: Formation): Boolean => {
  const positionList = formation.positions[position];
  const playerList = formation.players[position];

  if (!positionList || !playerList) {
    return false;
  }

  return playerList.length < positionList.length;
};

export const playersToPositions = (players: Player[], formationName: Formations): Formation => {
  const selectedFormation = formations[formationName];

  for (const player of players) {
    const position = getAlternativePosition(player.position ?? "CM", selectedFormation);
    const canPlace = isPositionAvailable(position, selectedFormation);

    // Create empty Player array if a player position is not yet mapped to position in formation
    if (!positionIsValidated(position, selectedFormation)) {
      selectedFormation.players[position] = [];
    }

    if (!positionsAreFull(position, selectedFormation)) {
      selectedFormation.players[position]!.push(player);
    } else {
      // TODO
    }
  }

  return selectedFormation;
};

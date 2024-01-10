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

const positionInFormation = (position: Positions, formation: Formation): boolean => {
  return position in formation.positions;
};

const positionIsValidated = (position: Positions, formation: Formation): boolean => {
  return position in formation.players;
};

const positionIsVacant = (position: Positions, formation: Formation): boolean => {
  const positionList = formation.positions[position];

  if (!positionList) {
    return false;
  }

  const playerList = formation.players[position] ?? [];

  return playerList.length < positionList.length;
};

const getAssignablePosition = (position: Positions, formation: Formation): Positions => {
  if (!positionInFormation(position, formation)) {
    const altPositions = alternativePosition[position] ?? [];

    for (const pos of altPositions) {
      // check if position exists in formation
      const valid = positionInFormation(pos, formation);
      // Assign position
      const assignable = positionIsVacant(pos, formation);
      if (valid && assignable) {
        return pos;
      }
    }
  }
  // position is in formation, check if vacant
  else if (positionIsVacant(position, formation)) {
    return position;
  }
  // return random empty position
  return position;
};

export const playersToPositions = (players: Player[], formationName: Formations): Formation => {
  const selectedFormation = formations[formationName];

  for (const player of players) {
    const position = getAssignablePosition(player.position ?? "CM", selectedFormation);
    const playersInPosition = selectedFormation.players[position] ?? [];

    playersInPosition.push(player);
    selectedFormation.players[position] = playersInPosition;
  }

  return selectedFormation;
};

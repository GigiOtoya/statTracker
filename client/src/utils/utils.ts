import { formations, Formations, Formation } from "../types/formations";
import { Player } from "../types/teamTypes";
import { Positions } from "../types/positions";
import { cloneDeep } from "lodash";

export const alternativePosition: Record<string, Positions[]> = {
  LW: ["LM"],
  LM: ["LW", "CM"],
  RW: ["RM"],
  RM: ["RW", "CM"],
  ST: ["CF", "CM"],
  CF: ["ST", "CM"],
  LB: ["RB", "CB"],
  RB: ["LB", "CB"],
};

export const positionInFormation = (position: Positions, formation: Formation): boolean => {
  return position in formation.positions;
};

const positionIsValidated = (position: Positions, formation: Formation): boolean => {
  return position in formation.players;
};

export const positionIsVacant = (position: Positions, formation: Formation): boolean => {
  const positionList = formation.positions[position];

  if (!positionList) {
    return false;
  }

  const playerList = formation.players[position] ?? [];

  return playerList.length < positionList.length;
};

export const getAssignablePosition = (position: Positions, formation: Formation): Positions => {
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
  const selectedFormation = cloneDeep(formations[formationName]);
  // const vacantPositions: Positions[] = Object.keys(selectedFormation.positions) as Positions[];
  const vacant: Set<Positions> = new Set(Object.keys(selectedFormation.positions) as Positions[]);
  const remainingPlayers: Player[] = [];

  for (const player of players) {
    const position = getAssignablePosition(player.position ?? "CM", selectedFormation);
    const playersInPosition = selectedFormation.players[position] ?? [];

    if (positionIsVacant(position, selectedFormation)) {
      playersInPosition.push(player);
      selectedFormation.players[position] = playersInPosition;

      if (!positionIsVacant(position, selectedFormation)) {
        vacant.delete(position);
      }
    } else {
      remainingPlayers.push(player);
    }
  }

  let index = 0;
  const remainingPositions: Positions[] = Array.from(vacant);
  for (const player of remainingPlayers) {
    const position = remainingPositions[index];
    selectedFormation.players[position]?.push(player);

    if (!positionIsVacant(position, selectedFormation)) {
      index++;
    }
  }

  return selectedFormation;
};

// const playerToPositions2 = (players: Player[], formationName: Formations) => {
//   //clone formation object?
//   const selectedFormation = formations[formationName];

//   for (const player of players) {
//     const position = getAssignablePosition(player.position ?? "CM", selectedFormation);
//   }
// };

import { formations, Formations, Formation } from "../types/formations";
import { Player, Squad } from "../types/teamTypes";
import { Positions } from "../types/positions";
import { cloneDeep } from "lodash";
import { messages, storageKeys } from "./presets";

export const wait = (ms: number) => {
  return new Promise((res) => setTimeout(res, ms));
};

export const getMessage = (squadlistLength: number, playerListLength: number, squad?: Squad) => {
  if (squadlistLength === 0) {
    return messages.squadListEmpty;
  }
  if (!squad) {
    return messages.squadUnselected;
  }
  if (playerListLength === 0) {
    return messages.playerListEmpty;
  }

  // if (squadlistLength > 0 && !squad) {
  //   return messages.squadUnselected;
  // }
  // if (squadlistLength === 0) {
  //   return messages.squadListEmpty;
  // }
  // if (playerListLength === 0) {
  //   return messages.playerListEmpty;
  // }
  return;
};

export const onSignOut = () => {
  storageKeys.forEach((k) => localStorage.removeItem(k));
};

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

export const inProperPosition = (p1: Positions, p2: Positions) => {
  if (p1 === p2) {
    return "perfect";
  }

  const altPositions = alternativePosition[p1] ?? [];
  if (altPositions.includes(p2)) {
    return "good";
  }

  return "bad";
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

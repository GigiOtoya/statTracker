import { Formation, Formations, formations } from "../types/formations";
import { Positions, positionList } from "../types/positions";
import { Player } from "../types/teamTypes";
import mockdata from "../utils/MOCK_DATA.json";
import {
  positionInFormation,
  positionIsVacant,
  getAssignablePosition,
  alternativePosition,
  playersToPositions,
} from "../utils/utils";
import _ from "lodash";

describe("Formations", () => {
  let formation = formations["4-4-2"];
  const GK: Positions = "GK";
  const RW: Positions = "RW";
  const testPlayer: Player = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    number: 10,
    starter: true,
  };

  beforeEach(() => {
    formation = _.cloneDeep(formations["4-4-2"]);
  });

  it("Position in formation", () => {
    expect(positionInFormation(GK, formation)).toBe(true);
  });

  it("Position not in formation", () => {
    expect(positionInFormation(RW, formation)).toBe(false);
  });

  it("Position vacant when number of player assigned to position < number of coordinates for position", () => {
    expect(positionIsVacant(GK, formation)).toBe(true);
  });

  it("Position full when all coordinates of position are used", () => {
    const playersInPosition = formation.players.GK ?? [];
    playersInPosition.push(testPlayer);
    formation.players.GK = playersInPosition;

    expect(positionIsVacant(GK, formation)).toBe(false);
  });

  it.each(positionList)("Alternative Position for %s", (pos) => {
    const altPositions = pos in formation.positions ? [pos] : alternativePosition[pos];
    expect(altPositions).toContain(getAssignablePosition(pos, formation));
  });

  it("Players to Position", () => {
    const players: Player[] = mockdata
      .filter((player) => player.starter)
      .map((player) => ({
        ...player,
        position: player.position as Positions,
      }));

    formation = playersToPositions(players, "4-4-2");

    for (const pos of Object.keys(formation.positions)) {
      const positionLimit = (formation.positions[pos as Positions] ?? []).length;
      const playerLimit = (formation.players[pos as Positions] ?? []).length;
      expect(positionLimit).toStrictEqual(playerLimit);
    }
  });
});

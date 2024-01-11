import { formations } from "../types/formations";
import { Positions, positionList } from "../types/positions";
import { Player } from "../types/teamTypes";
import {
  positionInFormation,
  positionIsVacant,
  getAssignablePosition,
  alternativePosition,
} from "../utils/utils";

describe("Formations", () => {
  const formation = formations["4-4-2"];
  const GK: Positions = "GK";
  const RW: Positions = "RW";
  const CM: Positions = "CM";
  const testPlayer: Player = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    number: 10,
    starter: true,
  };

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
    formation.players.GK?.push(testPlayer);
    expect(positionIsVacant(GK, formation)).toBe(false);
  });

  it("Alternative Position for RW: RM", () => {
    expect(getAssignablePosition(RW, formation)).toStrictEqual("RM");
  });

  it("Second Alternative Position for RW: CM", () => {
    formation.players.RM?.push(testPlayer);
    expect(getAssignablePosition(RW, formation)).toStrictEqual(CM);
  });

  it("No Alternative Position available GK: GK", () => {
    expect(getAssignablePosition(GK, formation)).toStrictEqual(GK);
  });
});

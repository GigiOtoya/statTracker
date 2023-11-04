import { Player } from "../types/types";
import { DropDown } from "./DropDown";
import { PlayerItem } from "./PlayerItem";

export const SquadBuilder = () => {
  const items: string[] = ["Squad 1", "Squad 2"];
  const player: Player = {
    number: 10,
    name: "TEST",
    position: "CM",
    pace: 10,
    shot: 10,
    physical: 10,
    defending: 10,
    dribble: 10,
    passing: 10,
    vision: 10,
    height: "5'9",
    weight: 150,
  };
  return (
    <div className="squad-builder-container">
      <DropDown items={items} />

      <div className="squad-builder">
        <div className="table-header">
          <span className="stat number"> # </span>
          <span className="col-name"> Name </span>
          <span className="stat pos"> POS </span>
          <span className="stat pace"> PAC </span>
          <span className="stat shooting"> SHO </span>
          <span className="stat physical"> PHY </span>
          <span className="stat defending"> DEF </span>
          <span className="stat dribbling"> DRI </span>
          <span className="stat passing"> PAS </span>
          <span className="stat vision"> VIS </span>
          <span className="stat height"> Ht </span>
          <span className="stat weight"> Wt </span>
        </div>
        <div className="player-list">
          <PlayerItem player={player} />
        </div>
      </div>
    </div>
  );
};

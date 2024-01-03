import { patchPlayers } from "../../api/PlayerApi";
import { Player, UpdatePlayerProperties } from "../../types/types";
import { buttonTypes } from "../../types/utilityTypes";
import { ActionButton } from "../actionButton/ActionButton";
import { PlayerItem } from "./PlayerItem";
import "./PlayerPicker.css";
interface PlayerPickerProps {
  starters: Player[];
  reserves: Player[];
  updatePlayerProperties: (playerId: number, updatedProperties: UpdatePlayerProperties) => void;
}

export const PlayerPicker = ({ starters, reserves, updatePlayerProperties }: PlayerPickerProps) => {
  const maxStarters = 11;
  const maxReserves = 25;

  const handleMovePlayer = (player: Player) => {
    if (!player.id) {
      return;
    }
    if (!player.starter && starters.length < maxStarters) {
      updatePlayerProperties(player.id, { starter: true });
    } else if (player.starter) {
      updatePlayerProperties(player.id, { starter: false });
    }
  };

  const handleSaveLineUp = () => {
    // patchPlayers
  };

  return (
    <div className="player-picker-container">
      <div className="player-picker-starters">
        <label>{`Starters: ${starters.length}/${maxStarters}`}</label>
        <div className="player-picker-items">
          {starters.map((player) => (
            <PlayerItem key={player.id} player={player} handleMovePlayer={handleMovePlayer} />
          ))}
        </div>
      </div>
      <div className="player-picker-reserves">
        <label>{`Reserves: ${reserves.length}/${maxReserves}`}</label>
        <div className="player-picker-items">
          {reserves.map((player) => (
            <PlayerItem key={player.id} player={player} handleMovePlayer={handleMovePlayer} />
          ))}
        </div>
      </div>
      <div>
        <ActionButton text="Save Line-Up" type={buttonTypes[0]} fn={() => {}} />
      </div>
    </div>
  );
};

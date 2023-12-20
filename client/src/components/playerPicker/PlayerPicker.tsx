import { Player } from "../../types/types";
import { PlayerItem } from "./PlayerItem";
import "./PlayerPicker.css";
interface PlayerPickerProps {
  players: Player[];
}

export const PlayerPicker = ({ players }: PlayerPickerProps) => {
  return (
    <div className="player-picker-container">
      <div className="player-picker-starters">
        <label>Starting Eleven:</label>
        <div className="player-picker-item">
          {players
            .filter((player, index) => index < 11)
            .map((player) => (
              <PlayerItem player={player} />
            ))}
        </div>
      </div>
      <div className="player-picker-reserves">
        <label>Reserves:</label>
        <div className="player-picker-item">
          {players
            .filter((player, index) => index > 10)
            .sort((a, b) => a.number - b.number)
            .map((player) => (
              <PlayerItem player={player} />
            ))}
        </div>
      </div>
    </div>
  );
};

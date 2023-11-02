import { Player } from "../types/types";

export const PlayerItem = (player: Player) => {
  return (
    <div className="player-item">
      <span className="player-number">
        <svg>
          <circle></circle>
        </svg>
      </span>
      <span className="player-name"> name </span>
      <span className="player-pos"> pos </span>
      <span className="player-pace"> pos </span>
      <span className="player-shooting"> pos </span>
      <span className="player-physical"> pos </span>
      <span className="player-defending"> pos </span>
      <span className="player-dribbling"> pos </span>
      <span className="player-passing"> pos </span>
      <span className="player-vision"> pos </span>
      <span className="player-height"> pos </span>
      <span className="player-weight"> pos </span>
    </div>
  );
};

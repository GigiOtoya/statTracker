import { Player } from "../../types/teamTypes";
import "./PlayerPicker.css";

interface PlayerItemProps {
  player: Player;
  handleMovePlayer: (player: Player) => void;
}

export const PlayerItem = ({ player, handleMovePlayer }: PlayerItemProps) => {
  const handleOnClick = () => {
    handleMovePlayer(player);
  };

  return (
    <div className="player-item" onClick={handleOnClick}>
      {player.number}
    </div>
  );
};

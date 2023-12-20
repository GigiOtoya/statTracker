import { Player } from "../../types/types";
import "./PlayerPicker.css";

interface PlayerItemProps {
  player: Player;
}

export const PlayerItem = ({ player }: PlayerItemProps) => {
  return <div className="player-item">{player.number}</div>;
};

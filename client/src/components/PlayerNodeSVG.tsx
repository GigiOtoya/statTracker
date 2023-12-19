import { Player } from "../types/types";
interface PlayerSVGProps {
  player: Player;
}

export const PlayerNodeSVG = ({ player }: PlayerSVGProps) => {
  return (
    <circle>
      <text> {player.number} </text>
    </circle>
  );
};

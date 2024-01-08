import { Player } from "../types/teamTypes";
interface PlayerSVGProps {
  player: Player;
}

export const PlayerNodeSVG = ({ player }: PlayerSVGProps) => {
  return (
    <g>
      <circle>
        <text> {player.number} </text>
      </circle>
      <text></text>
    </g>
  );
};

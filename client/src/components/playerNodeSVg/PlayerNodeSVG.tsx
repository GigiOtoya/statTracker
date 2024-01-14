import { Player } from "../../types/teamTypes";
import { Point } from "../../types/utilityTypes";
import "./PlayerNodeSVG.css";

interface PlayerSVGProps {
  player: Player;
  point: Point;
}

export const PlayerNodeSVG = ({ player, point }: PlayerSVGProps) => {
  return (
    <g>
      <circle className="player-circle" cx={point.x} cy={point.y} r={100} />
      <text className="player-circle-text" x={point.x} y={point.y - 20}>
        {player.number}
      </text>
      <text className="player-circle-bottom" x={point.x} y={point.y + 34}>
        {player.lastName}
      </text>
    </g>
  );
};

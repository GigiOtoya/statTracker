import { Player } from "../types/types";

export const PlayerNodeSVG = (player: Player) => {
  return (
    <circle>
      <text> {player.number} </text>
    </circle>
  );
};

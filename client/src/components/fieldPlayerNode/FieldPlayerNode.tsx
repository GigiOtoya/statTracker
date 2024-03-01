import { Positions } from "../../types/positions";
import { Player } from "../../types/teamTypes";
import { Point } from "../../types/utilityTypes";
import { inProperPosition } from "../../utils/utils";
import styles from "./FieldPlayerNode.module.css";

interface props {
  player?: Player;
  position: Positions;
  point: Point;
  onMouseDown: (e: React.MouseEvent<SVGGElement>) => void;
}

export const FieldPlayerNode = ({ player, position, point, onMouseDown }: props) => {
  const match = inProperPosition(position, player?.position!);
  const handleMouseDown = (e: React.MouseEvent<SVGGElement>) => {
    onMouseDown(e);
  };

  return (
    <g transform={`translate(${point.x}, ${point.y})`} onMouseDown={handleMouseDown}>
      <circle className={`${styles.node} ${styles[match]}`} r={100} />
      {player && (
        <>
          <text className={styles.number} y={-20}>
            {player.number}
          </text>
          <text className={styles.name} y={34}>
            {player.lastName}
          </text>
          <text className={styles.position} y={130}>
            {position}
          </text>
        </>
      )}
      {!player && (
        <text className={styles.number} y={-20}>
          +
        </text>
      )}
    </g>
  );
};

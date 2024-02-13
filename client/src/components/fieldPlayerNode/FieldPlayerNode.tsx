import { Player } from "../../types/teamTypes";
import { Point } from "../../types/utilityTypes";
import styles from "./FieldPlayerNode.module.css";

interface props {
  player: Player;
  point: Point;
  onMouseDown: (e: React.MouseEvent<SVGGElement>) => void;
  getBounds?: () => { left: number; top: number };
}

export const FieldPlayerNode = ({ player, point, onMouseDown, getBounds }: props) => {
  const handleMouseDown = (e: React.MouseEvent<SVGGElement>) => {
    onMouseDown(e);
  };

  return (
    <g transform={`translate(${point.x}, ${point.y})`} onMouseDown={handleMouseDown}>
      <circle className={styles.node} r={100} />
      <text className={styles.number} y={-20}>
        {player.number}
      </text>
      <text className={styles.name} y={34}>
        {player.lastName}
      </text>
    </g>
  );
};

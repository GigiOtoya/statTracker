import { Player } from "../../types/teamTypes";
import styles from "./PlayerPickerItem.module.css";

interface PlayerPickerItemProps {
  player: Player;
  handleMovePlayer: (player: Player) => void;
}

export const PlayerPickerItem = ({ player, handleMovePlayer }: PlayerPickerItemProps) => {
  const handleOnClick = () => {
    handleMovePlayer(player);
  };

  return (
    <div className={styles.container}>
      <div className={styles.item} onClick={handleOnClick}>
        {player.number}
      </div>
      <div className={styles.label}>{player.position}</div>
    </div>
  );
};

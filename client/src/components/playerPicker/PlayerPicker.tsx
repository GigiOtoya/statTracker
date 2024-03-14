import { MdOutlineSave } from "react-icons/md";
import { Player, MutablePlayerProperties } from "../../types/teamTypes";
import { PlayerPickerItem } from "../playerPickerItem/PlayerPickerItem";
import styles from "./PlayerPicker.module.css";

interface Props {
  starters: Player[];
  reserves: Player[];
  saveLineUp: (numbers: number[]) => void;
  updatePlayerProperties: (playerId: number, updatedProperties: MutablePlayerProperties) => void;
}

export const PlayerPicker = ({ starters, reserves, saveLineUp, updatePlayerProperties }: Props) => {
  const maxStarters = 11;
  const maxReserves = 25;
  const canSave = starters.length > 0 || reserves.length > 0;

  const handleMovePlayer = (player: Player) => {
    if (!player.id) {
      return;
    }
    if (!player.starter && starters.length < maxStarters) {
      updatePlayerProperties(player.id, { starter: true });
    } else if (player.starter) {
      updatePlayerProperties(player.id, { starter: false });
    }
  };

  const handleOnClick = () => {
    if (!canSave) {
      return;
    }

    const starterNumbers: number[] = starters.map((player) => player.number);
    saveLineUp(starterNumbers);
  };

  return (
    <div className={styles.container}>
      <span className={styles.lineup}>
        <div className={styles.starters}>
          <label>{`Starters: ${starters.length}/${maxStarters}`}</label>
          <div className={styles.items}>
            {starters.map((player) => (
              <PlayerPickerItem
                key={player.id}
                player={player}
                handleMovePlayer={handleMovePlayer}
              />
            ))}
          </div>
        </div>
        <div className={styles.reserves}>
          <label>{`Reserves: ${reserves.length}/${maxReserves}`}</label>
          <div className={styles.items}>
            {reserves.map((player) => (
              <PlayerPickerItem
                key={player.id}
                player={player}
                handleMovePlayer={handleMovePlayer}
              />
            ))}
          </div>
        </div>
      </span>
      {canSave && (
        <span className={styles.save}>
          <div>
            <MdOutlineSave size={"35px"} onClick={handleOnClick} />
            save
          </div>
        </span>
      )}
    </div>
  );
};

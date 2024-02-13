import { Player, MutablePlayerProperties } from "../../types/teamTypes";
import { buttonTypes } from "../../types/utilityTypes";
import { ActionButton } from "../actionButton/ActionButton";
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
    if (!starters.length) {
      return;
    }

    const starterNumbers: number[] = starters.map((player) => player.number);
    saveLineUp(starterNumbers);
  };

  return (
    <div className={styles.container}>
      <div className={styles.starters}>
        <label>{`Starters: ${starters.length}/${maxStarters}`}</label>
        <div className={styles.items}>
          {starters.map((player) => (
            <PlayerPickerItem key={player.id} player={player} handleMovePlayer={handleMovePlayer} />
          ))}
        </div>
      </div>
      <div className={styles.reserves}>
        <label>{`Reserves: ${reserves.length}/${maxReserves}`}</label>
        <div className={styles.items}>
          {reserves.map((player) => (
            <PlayerPickerItem key={player.id} player={player} handleMovePlayer={handleMovePlayer} />
          ))}
        </div>
      </div>
      <div>
        <ActionButton text="Save Line-Up" className={buttonTypes[0]} onClick={handleOnClick} />
      </div>
    </div>
  );
};

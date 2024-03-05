import { useContext, useState } from "react";
import { Player, Squad, playerData } from "../../types/teamTypes";
import { Input, inputTextPresets, inputRangePresets, inputNumPresets } from "../input/Input";
import { HorizontalSelect } from "../horizontalSelect/HorizontalSelect";
import { getSquadPlayers, addPlayer, editPlayer } from "../../api/PlayerApi";
import { AxiosError } from "axios";
import { wait } from "../../utils/utils";
import { validateInput } from "../../utils/validationUtils";
import { DialogModalContext } from "../modals/DialogModal";
import { Message } from "../../types/utilityTypes";
import mstyles from "../modals/Modal.module.css";
import styles from "./AddPlayer.module.css";

interface Props {
  selectedSquad?: Squad;
  updatePlayers: (playerList: Player[]) => void;
  player: Player;
  editFields: (name: string, value: string | number) => void;
}

export const AddPlayer = ({ selectedSquad, updatePlayers, player, editFields }: Props) => {
  const modalContext = useContext(DialogModalContext);
  const [message, setMessage] = useState<Message>({ message: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedSquad) {
      return;
    }

    try {
      let msg;

      if (player.id) {
        const editPlayerResponse = await editPlayer(player);
        msg = editPlayerResponse.data;
      } else {
        const addPlayerResponse = await addPlayer(player, selectedSquad.id);
        msg = addPlayerResponse.data;
      }

      const getPlayersResponse = await getSquadPlayers(selectedSquad.id);
      const players: Player[] = getPlayersResponse.data;

      updatePlayers(players);
      setMessage({ type: "success", message: msg });

      await wait(1000);
      handleClose();
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        setMessage({ type: "error", message: e.response.data });
      }
    }
  };

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setMessage({ message: "" });
    const { name } = e.currentTarget;
    const value = validateInput(e.currentTarget);
    editFields(name, value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.currentTarget.type === "number") {
      ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
    }
  };

  const handleClose = () => {
    modalContext?.handleOnClose();
  };

  const textPresets = { ...inputTextPresets, onChange: handleOnChange };
  const rangePresets = { ...inputRangePresets, onChange: handleOnChange };
  const numPresets = {
    ...inputNumPresets,
    onChange: handleOnChange,
    onKeyDown: handleKeyDown,
  };

  return (
    <form className={mstyles.container} onSubmit={(e) => handleSubmit(e)}>
      <h2 className={`${mstyles.header} ${mstyles.positive}`}>
        {player.id ? "Edit Player" : "New Player"}
      </h2>
      {message.type === "success" ? (
        <p className={message.type}>{message.message}</p>
      ) : (
        <div className="body">
          <Input
            label="First Name"
            name={playerData.firstName}
            placeholder="First Name..."
            value={player.firstName}
            {...textPresets}
          />
          <Input
            label="Last Name"
            name={playerData.lastName}
            placeholder="Last Name..."
            value={player.lastName}
            {...textPresets}
          />
          <div className={styles.inputs}>
            <div className={styles.split}>
              <Input
                label="Number"
                name={playerData.number}
                value={player.number}
                {...numPresets}
              />
              <HorizontalSelect
                label="Position"
                name={playerData.position}
                value={player.position}
                onChange={editFields}
              />
            </div>
            <Input
              label="Vision"
              name={playerData.vision}
              value={player.vision}
              {...rangePresets}
            />
            <Input label="Speed" name={playerData.speed} value={player.speed} {...rangePresets} />
            <Input
              label="Passing"
              name={playerData.passing}
              value={player.passing}
              {...rangePresets}
            />
            <Input
              label="Shooting"
              name={playerData.shooting}
              value={player.shooting}
              {...rangePresets}
            />
            <Input
              label="Defending"
              name={playerData.defending}
              value={player.defending}
              {...rangePresets}
            />
            <Input
              label="Dribbling"
              name={playerData.dribbling}
              value={player.dribbling}
              {...rangePresets}
            />
            <Input
              label="Physical"
              name={playerData.physical}
              value={player.physical}
              {...rangePresets}
            />
          </div>
          <div className={mstyles.footer}>
            <button className={`${mstyles.btn} ${mstyles.positive}`} type="submit">
              Submit
            </button>
            <button
              className={`${mstyles.btn} ${mstyles.neutral}`}
              type="button"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
          <div className={styles.footer}>
            {message.type === "error" && <p className={message.type}>{message.message}</p>}
          </div>
        </div>
      )}
    </form>
  );
};

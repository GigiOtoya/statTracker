import { useContext, useState } from "react";
import { Player, Squad, playerData } from "../../types/teamTypes";
import { Input, inputTextPresets, inputRangePresets, inputNumPresets } from "../input/Input";
import { HorizontalSelect } from "./HorizontalSelect";
import "./AddPlayer.css";
import { getSquadPlayers, addPlayer } from "../../api/PlayerApi";
import { AxiosError } from "axios";
import { wait } from "../../utils/utils";
import { validateInput } from "../../utils/validationUtils";
import { DialogModalContext } from "../modals/DialogModal";

interface Props {
  selectedSquad?: Squad;
  updatePlayers: (playerList: Player[]) => void;
  player: Player;
  editPlayer: (name: string, value: string | number) => void;
}

export const AddPlayer = ({ selectedSquad, updatePlayers, player, editPlayer }: Props) => {
  const modalContext = useContext(DialogModalContext);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedSquad) {
      return;
    }

    try {
      const addPlayerResponse = await addPlayer(player, selectedSquad.id);
      const getPlayersResponse = await getSquadPlayers(selectedSquad.id);
      const players: Player[] = getPlayersResponse.data;
      updatePlayers(players);
      setSuccess(addPlayerResponse.data);

      await wait(1000);
      handleClose();
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data);
      }
    }
  };

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;
    const value = validateInput(e.currentTarget);
    editPlayer(name, value);
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
    <form className="modal-container" onSubmit={(e) => handleSubmit(e)}>
      <h2 className="modal-header header-positive">New Player</h2>
      <div className="split-2">
        <div className="player-data-name">
          <Input
            label="First Name"
            name={playerData.firstName}
            placeholder="First Name..."
            value={player.firstName}
            {...textPresets}
          ></Input>
        </div>
        <div className="player-data-name">
          <Input
            label="Last Name"
            name={playerData.lastName}
            placeholder="Last Name..."
            value={player.lastName}
            {...textPresets}
          ></Input>
        </div>
      </div>
      <div className="split-3">
        <div className="split-3-data">
          <Input label="Number" name={playerData.number} value={player.number} {...numPresets} />
          <HorizontalSelect
            label="Position"
            name={playerData.position}
            value={player.position}
            onChange={editPlayer}
          />
          <Input label="Vision" name={playerData.vision} value={player.vision} {...rangePresets} />
        </div>
        <div className="split-3-data">
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
        </div>
        <div className="split-3-data">
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
      </div>
      <div className="player-data-footer">
        <p className="error">{error && error}</p>
      </div>
      <div className="modal-footer">
        <button className="modal-btn btn-positive" type="submit">
          Submit
        </button>
        <button className="modal-btn btn-neutral" type="button" onClick={handleClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

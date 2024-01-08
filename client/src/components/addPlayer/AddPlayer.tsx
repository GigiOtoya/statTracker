import { useState } from "react";
import { Player, defaultPlayer, playerData } from "../../types/teamTypes";
import { Slider } from "./Slider";
import { Input } from "./Input";
import { HorizontalSelect } from "./HorizontalSelect";
import "./AddPlayer.css";
import { getSquadPlayers, addPlayer } from "../../api/PlayerApi";

interface Props {
  selectedSquad?: number;
  updatePlayers: (playerList: Player[]) => void;
}

export const AddPlayer = ({ selectedSquad, updatePlayers }: Props) => {
  const [player, setPlayer] = useState<Player>(defaultPlayer);

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;
    const value = validateNumber(e.currentTarget.value);
    updatePlayer(name, value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedSquad) {
      return;
    }

    await addPlayer(player, selectedSquad)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    await getSquadPlayers(selectedSquad)
      .then((res) => {
        const players: Player[] = res.data;
        updatePlayers(players);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatePlayer = (name: string, value: string | number) => {
    setPlayer((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(player);
  };

  const validateNumber = (num: number | string) => {
    const value = Number(num);
    if (!value) return num;
    if (value > 99) return 99;
    if (value < 1) return 1;
    return value;
  };

  return (
    <form className="player-data-form" onSubmit={(e) => handleSubmit(e)}>
      <div className="player-data-header">
        <h2>New Player</h2>
      </div>
      <div className="split-2">
        <div className="player-data-name">
          <Input
            label="First Name"
            type="text"
            name={playerData.firstName}
            value={player.firstName}
            updatePlayer={updatePlayer}
          ></Input>
        </div>
        <div className="player-data-name">
          <Input
            label="Last Name"
            type="text"
            name={playerData.lastName}
            value={player.lastName}
            updatePlayer={updatePlayer}
          ></Input>
        </div>
      </div>
      <div className="split-3">
        <div className="split-3-data">
          <Input
            label="Number"
            type="number"
            name={playerData.number}
            value={player.number}
            updatePlayer={updatePlayer}
          />
          <HorizontalSelect
            label="Position"
            name={playerData.position}
            value={player.position}
            updatePlayer={updatePlayer}
          />
          <Slider
            label="Vision"
            name={playerData.vision}
            value={player.vision}
            updatePlayer={updatePlayer}
          />
        </div>
        <div className="split-3-data">
          <Slider
            label="Speed"
            name={playerData.speed}
            value={player.speed}
            updatePlayer={updatePlayer}
          />
          <Slider
            label="Passing"
            name={playerData.passing}
            value={player.passing}
            updatePlayer={updatePlayer}
          />
          <Slider
            label="Shooting"
            name={playerData.shooting}
            value={player.shooting}
            updatePlayer={updatePlayer}
          />
        </div>
        <div className="split-3-data">
          <Slider
            label="Defending"
            name={playerData.defending}
            value={player.defending}
            updatePlayer={updatePlayer}
          />
          <Slider
            label="Dribbling"
            name={playerData.dribbling}
            value={player.dribbling}
            updatePlayer={updatePlayer}
          />
          <Slider
            label="Physical"
            name={playerData.physical}
            value={player.physical}
            updatePlayer={updatePlayer}
          />
        </div>
      </div>
      <div className="player-data-footer">
        <button className="action-btn btn-positive" type="submit">
          Submit Player
        </button>
      </div>
    </form>
  );
};

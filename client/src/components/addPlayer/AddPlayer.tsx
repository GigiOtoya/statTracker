import { useState } from "react";
import "./AddPlayer.css";
import { Player, defaultPlayer, playerData } from "../../types/types";
import { Slider } from "./Slider";
import { Input } from "./Input";
import { HorizontalSelect } from "./HorizontalSelect";

export const AddPlayer = () => {
  const [player, setPlayer] = useState<Player>(defaultPlayer);

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;
    const value = validateNumber(e.currentTarget.value);
    updatePlayer(name, value);
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
    <form className="player-data-form">
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
          <div>
            <HorizontalSelect
              label="Position"
              name={playerData.position}
              value={player.position}
              updatePlayer={updatePlayer}
            />
            <Input
              label="Number"
              type="number"
              name={playerData.number}
              value={player.number}
              updatePlayer={updatePlayer}
            />
          </div>
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
            name={playerData.dribble}
            value={player.dribble}
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
    </form>
  );
};

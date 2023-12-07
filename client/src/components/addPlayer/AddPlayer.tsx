import { useState } from "react";
import "./AddPlayer.css";
import { Player, defaultPlayer, playerData } from "../../types/types";
import { Slider } from "./Slider";
import { Input } from "./Input";

export const AddPlayer = () => {
  const [player, setPlayer] = useState<Player>(defaultPlayer);

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;

    const value = validateNumber(e.currentTarget.value);

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
            onChange={handleOnChange}
          ></Input>
        </div>
        <div className="player-data-name">
          <Input
            label="Last Name"
            type="text"
            name={playerData.lastName}
            value={player.lastName}
            onChange={handleOnChange}
          ></Input>
        </div>
      </div>
      <div className="split-3">
        <div className="split-3-data">
          <div>
            <Input
              label="Position"
              name={playerData.position}
              value={player.position}
              onChange={handleOnChange}
            />
            <Input
              label="Number"
              type="number"
              name={playerData.number}
              value={player.number}
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div className="split-3-data">
          <Slider
            label="Speed"
            name={playerData.speed}
            value={player.speed}
            onChange={handleOnChange}
          />
          <Slider
            label="Passing"
            name={playerData.passing}
            value={player.passing}
            onChange={handleOnChange}
          />
          <Slider
            label="Shooting"
            name={playerData.shooting}
            value={player.shooting}
            onChange={handleOnChange}
          />
        </div>
        <div className="split-3-data">
          <Slider
            label="Defending"
            name={playerData.defending}
            value={player.defending}
            onChange={handleOnChange}
          />
          <Slider
            label="Dribbling"
            name={playerData.dribble}
            value={player.dribble}
            onChange={handleOnChange}
          />
          <Slider
            label="Physical"
            name={playerData.physical}
            value={player.physical}
            onChange={handleOnChange}
          />
        </div>
      </div>
    </form>
  );
};

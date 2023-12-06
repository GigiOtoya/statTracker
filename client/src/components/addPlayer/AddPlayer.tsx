import { useState } from "react";
import "./AddPlayer.css";
import { Player, defaultPlayer, playerData } from "../../types/types";

export const AddPlayer = () => {
  const [player, setPlayer] = useState<Player>({
    number: 0,
    firstName: "",
    lastName: "",
    position: "",
    speed: 0,
    shooting: 0,
    physical: 0,
    defending: 0,
    dribble: 0,
    passing: 0,
    vision: 0,
  });

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setPlayer((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(player);
  };

  return (
    <form className="player-data-form">
      <div className="split-2">
        <div className="player-data-name">
          <div>
            <label>First Name:</label>
          </div>
          <input name={playerData.firstName} value={player.firstName} onChange={handleOnChange} />
        </div>
        <div className="player-data-name">
          <div>
            <label>Last Name:</label>
          </div>
          <input name={playerData.lastName} value={player.lastName} onChange={handleOnChange} />
        </div>
      </div>
      <div className="split-3">
        <span className="split-3-data">
          <div>
            <label>Position:</label>
            <input name={playerData.position} value={player.position} onChange={handleOnChange} />
            <label>Number:</label>
            <input name={playerData.number} value={player.number} onChange={handleOnChange} />
          </div>
        </span>
        <span className="split-3-data">
          <label>Speed:</label>
          <input name={playerData.speed} value={player.speed} onChange={handleOnChange} />
          <label>Passing:</label>
          <input name={playerData.passing} value={player.passing} onChange={handleOnChange} />
          <label>Shooting:</label>
          <input name={playerData.shooting} value={player.shooting} onChange={handleOnChange} />
        </span>
        <span className="split-3-data">
          <label>Defending:</label>
          <input name={playerData.defending} value={player.defending} onChange={handleOnChange} />
          <label>Dribbling:</label>
          <input name={playerData.dribble} value={player.dribble} onChange={handleOnChange} />
          <label>Physical:</label>
          <input name={playerData.physical} value={player.physical} onChange={handleOnChange} />
        </span>
      </div>
    </form>
  );
};

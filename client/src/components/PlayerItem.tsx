import { Player } from "../types/types";

type props = {
  player: Player;
};
export const PlayerItem = ({ player }: props) => {
  return (
    <div className="player-item">
      <span className="stat number">
        {/* <svg>
          <circle></circle>
        </svg> */}{" "}
        {player.number}
      </span>
      <span className="col-name">{player.firstName}</span>
      <span className="stat pos">{player.position}</span>
      <span className="stat pace">{player.speed}</span>
      <span className="stat shooting">{player.shooting}</span>
      <span className="stat physical">{player.physical}</span>
      <span className="stat defending">{player.defending}</span>
      <span className="stat dribbling">{player.dribble}</span>
      <span className="stat passing">{player.passing}</span>
      <span className="stat vision">{player.vision}</span>
      <span className="stat height">{player.height}</span>
      <span className="stat weight">{player.weight}</span>
    </div>
  );
};

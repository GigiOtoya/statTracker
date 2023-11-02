import { ReactComponent as FieldSVG } from "../assets/Field-min.svg";
import { useState } from "react";
import { Player } from "../types/types";

export const Field = () => {
  const [players, setPlayers] = useState<Player[]>(() => {
    const p: Player[] = [];
    for (let i = 0; i < 11; i++) {
      const player: Player = { number: i + 1 };
      p.push(player);
    }
    return p;
  });
  const [svgSize, setSvgSize] = useState({ width: 100, height: 100 });

  // return <svg width={svgSize.width} height={svgSize.height}></svg>;
  return (
    <div className="svg-container">
      <svg viewBox="0 0 1600 2560">
        <FieldSVG className="svg-field"></FieldSVG>
        <circle cx={300} cy={300} r={100}>
          {" "}
          asdfasdf
        </circle>
      </svg>
    </div>
  );
};

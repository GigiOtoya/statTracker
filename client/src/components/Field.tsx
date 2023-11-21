import { ReactComponent as FieldSVG } from "../assets/Field-min.svg";
import { useState } from "react";
import { Player } from "../types/types";
import { DropDown } from "./DropDown";

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
  const [formation, setFormation] = useState<string>("");
  const [viewbox, setViewBox] = useState({ minx: 0, miny: 0, width: 1600, height: 2560 });

  return (
    <div className="svg-container">
      <svg viewBox={`${viewbox.minx} ${viewbox.miny} ${viewbox.width} ${viewbox.height} `}>
        <FieldSVG className="svg-field"></FieldSVG>
        <circle cx={300} cy={300} r={100}></circle>
      </svg>
    </div>
  );
};

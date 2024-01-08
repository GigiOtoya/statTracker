import { ReactComponent as FieldSVG } from "../assets/Field-min.svg";
import React, { useState } from "react";
import { Player } from "../types/teamTypes";
import { PlayerNodeSVG } from "./PlayerNodeSVG";

interface FieldProps {
  players: Player[];
}

export const Field = ({ players }: FieldProps) => {
  const [svgSize, setSvgSize] = useState({ width: 100, height: 100 });
  const [formation, setFormation] = useState<string>("");
  const [viewbox, setViewBox] = useState({ minx: 0, miny: 0, width: 1600, height: 2560 });
  const [circle, setCircle] = useState<SVGCircleElement | null>();
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<SVGCircleElement>) => {
    setCircle(e.currentTarget);
    setIsDragging(true);
  };

  const handleMouseUp = (e: React.MouseEvent<SVGSVGElement>) => {
    setCircle(null);
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const currentCoords = { x: e.clientX, y: e.clientY };
    const { left, top } = e.currentTarget.getBoundingClientRect();

    if (isDragging) {
      const x = viewbox.minx + currentCoords.x - left;
      const y = viewbox.miny + currentCoords.y - top;
      circle?.setAttribute("cx", x.toString());
      circle?.setAttribute("cy", y.toString());
    }
  };

  return (
    <div className="svg-container">
      <svg
        viewBox={`${viewbox.minx} ${viewbox.miny} ${viewbox.width} ${viewbox.height} `}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <FieldSVG className="svg-field"></FieldSVG>
        {players.map((player) => (
          <PlayerNodeSVG player={player} />
        ))}

        <g>
          <circle cx={300} cy={300} r={100} onMouseDown={handleMouseDown} />
          <text x={300} y={300}>
            sdfsdsdfsdf
          </text>
        </g>
      </svg>
    </div>
  );
};

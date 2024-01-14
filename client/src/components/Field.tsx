import { ReactComponent as FieldSVG } from "../assets/Field-min.svg";
import React, { useEffect, useState } from "react";
import { Player } from "../types/teamTypes";
import { PlayerNodeSVG } from "./playerNodeSVg/PlayerNodeSVG";
import { playersToPositions } from "../utils/utils";
import { Formations } from "../types/formations";
import { Positions } from "../types/positions";
import { width, height } from "../utils/presets";
import { Point } from "../types/utilityTypes";

interface FieldProps {
  players: Player[];
  formationName: Formations;
}

export const Field = ({ players, formationName }: FieldProps) => {
  const viewbox = { minx: 0, miny: 0, width: width, height: height };

  const formation = playersToPositions(players, formationName);
  const positions = Object.keys(formation.positions) as Positions[];

  const playerNodes = positions.flatMap((pos) =>
    formation.players[pos]?.map((player, index) => {
      const point: Point = formation.positions[pos]![index];
      return <PlayerNodeSVG player={player} point={point} />;
    })
  );

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
        {playerNodes}
      </svg>
    </div>
  );
};

import { ReactComponent as FieldSVG } from "../../assets/Field-min.svg";
import React, { useRef, useState } from "react";
import { Player } from "../../types/teamTypes";
import { FieldPlayerNode } from "../fieldPlayerNode/FieldPlayerNode";
import { playersToPositions } from "../../utils/utils";
import { Formations } from "../../types/formations";
import { Positions } from "../../types/positions";
import { viewbox } from "../../utils/presets";
import { Point } from "../../types/utilityTypes";

interface FieldProps {
  players: Player[];
  formationName: Formations;
}

export const Field = ({ players, formationName }: FieldProps) => {
  const fieldRef = useRef<SVGSVGElement>(null);
  const formation = playersToPositions(players, formationName);
  const positions = Object.keys(formation.positions) as Positions[];

  const [isDragging, setIsDragging] = useState(false);
  const [node, setNode] = useState<SVGGElement | null>();

  const handleMouseDown = (e: React.MouseEvent<SVGGElement>) => {
    const selectedNode = e.currentTarget;

    setNode(selectedNode);
    setIsDragging(true);
  };

  const handleMouseUp = (e: React.MouseEvent<SVGSVGElement>) => {
    setNode(null);
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();

    if (isDragging && node) {
      const scaleX = width / viewbox.width;
      const scaleY = height / viewbox.height;

      const x = (clientX - left) / scaleX;
      const y = (clientY - top) / scaleY;

      console.log(x, y);
      node?.setAttribute("transform", `translate(${x}, ${y})`);
    }
  };

  const playerNodes = positions.flatMap((pos) =>
    formation.players[pos]?.map((player, index) => {
      const point: Point = formation.positions[pos]![index];
      return (
        <FieldPlayerNode
          key={player.id}
          player={player}
          point={point}
          onMouseDown={handleMouseDown}
        />
      );
    })
  );

  return (
    <div className="svg-container">
      <svg
        ref={fieldRef}
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

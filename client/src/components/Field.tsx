import { ReactComponent as FieldSVG } from "../assets/Field-min.svg";
import { useState } from "react";

export const Field = () => {
  const [players, setPlayers] = useState([]);
  const [svgSize, setSvgSize] = useState({ width: 100, height: 100 });

  // return <svg width={svgSize.width} height={svgSize.height}></svg>;
  return (
    <div className="svg-container">
      <FieldSVG className="svg-field" viewBox="0 0 1600 2560"></FieldSVG>;
    </div>
  );
};

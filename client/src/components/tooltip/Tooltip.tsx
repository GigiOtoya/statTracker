import "./Tooltip.css";

interface tooltipProps {
  text: String;
  tooltipText: String;
}

export const Tooltip = ({ text, tooltipText }: tooltipProps) => {
  return (
    <div className="tooltip">
      {text}
      <div className="tooltiptext">{tooltipText}</div>
    </div>
  );
};

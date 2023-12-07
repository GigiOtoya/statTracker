interface SliderProps {
  label: string;
  name: string;
  value?: number;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

export const Slider = ({ label, name, value, onChange }: SliderProps) => {
  return (
    <div>
      <div className="slider-header">
        <label className="slider-label">{`${label}:`}</label>
        <span className="slider-value">{value}</span>
      </div>
      <input type="range" name={name} value={value} onChange={onChange} min={1} max={10} />
    </div>
  );
};

interface SliderProps {
  label: string;
  name: string;
  value?: number;
  // onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  updatePlayer: (name: string, value: string | number) => void;
}

export const Slider = ({ label, name, value, updatePlayer }: SliderProps) => {
  const min = 1;
  const max = 10;

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    updatePlayer(name, value);
  };

  return (
    <div>
      <div className="slider-header">
        <label className="slider-label">{`${label}:`}</label>
        <span className="slider-value">{value}</span>
      </div>
      <input type="range" name={name} value={value} onChange={handleOnChange} min={min} max={max} />
    </div>
  );
};

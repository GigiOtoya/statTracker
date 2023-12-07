interface InputProps {
  label: string;
  type?: string;
  name: string;
  value?: string | number;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

export const Input = (props: InputProps) => {
  const { label, type, name, value, onChange } = props;

  return (
    <div>
      <div className="slider-header">
        <label className="slider-label">{`${label}:`}</label>
        <span className="slider-value">{value}</span>
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        {...(type === "number" ? { min: 1, max: 99 } : {})}
      />
    </div>
  );
};

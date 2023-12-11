interface InputProps {
  label: string;
  type?: string;
  name: string;
  value?: string | number;
  updatePlayer: (name: string, value: string | number) => void;
}

export const Input = (props: InputProps) => {
  const { label, type, name, value, updatePlayer } = props;
  const min = 1;
  const max = 99;

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;
    const value = validate(e.currentTarget.value);
    updatePlayer(name, value);
  };

  const validate = (value: string) => {
    if (Number(value)) {
      return validateNumber(value);
    }
    return validateText(value);
  };

  const validateNumber = (num: string) => {
    const value = Number(num);
    if (!value) return num;
    if (value > max) return max;
    if (value < min) return min;
    return value;
  };

  const validateText = (str: string) => {
    return str;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === "number") {
      ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
    }
  };

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
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        {...(type === "number" ? { min: min, max: max } : {})}
      />
    </div>
  );
};

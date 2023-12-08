interface InputProps {
  label: string;
  type?: string;
  name: string;
  value?: string | number;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

export const Input = (props: InputProps) => {
  const { label, type, name, value, onChange } = props;
  const min = 1;
  const max = 99;

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;
    const value = type === "number" ? validateNumber(e.currentTarget.value) : 1;

    onChange(e);
  };

  const validate = (val: number | string) => {
    if (Number(val)) {
      return validateNumber(val);
    }
    // return validateText(val);
  };

  const validateNumber = (num: number | string) => {
    const value = Number(num);
    if (!value) return num;
    if (value > max) return max;
    if (value < min) return min;
    return value;
  };

  const validateText = (str: string) => {};

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
        {...(type === "number" ? { min: min, max: max } : {})}
      />
    </div>
  );
};

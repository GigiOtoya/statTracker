import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  displayInput?: true;
  error?: boolean;
}

export const inputTextPresets: InputProps = {
  type: "text",
  minLength: 1,
  maxLength: 35,
  required: true,
};

export const inputRangePresets: InputProps = {
  type: "range",
  displayInput: true,
  min: 1,
  max: 10,
  required: true,
};

export const inputNumPresets: InputProps = {
  type: "number",
  displayInput: true,
  min: 1,
  max: 99,
  required: true,
};

export const Input = ({ label, displayInput, ...props }: InputProps) => {
  return (
    <div>
      <div className="input-header">
        <label className="input-label">{`${label}:`}</label>
        {displayInput && <span className="display-value">{props.value}</span>}
      </div>
      <input {...props} />
    </div>
  );
};

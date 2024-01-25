// export const validate = (value: string) => {
//   if (Number(value)) {
//     return validateNumber(value);
//   }
//   return validateText(value);
// };

// export const validateNumber = (e: HTMLInputElement) => {
//   const value = Number(num);
//   if (!value) return num;
//   if (value > max) return max;
//   if (value < min) return min;
//   return value;
// };

export const validateText = (str: string) => {
  return str;
};

export const validateInput = (e: HTMLInputElement) => {
  if (e.type === "number") {
    return validateNumber(e);
  }
  return e.value;
};

const validateNumber = (e: HTMLInputElement): string => {
  const value = Number(e.value);
  const min = Number(e.min);
  const max = Number(e.max);

  if (value > max) return e.max;
  if (value < min) return e.min;
  return e.value;
};

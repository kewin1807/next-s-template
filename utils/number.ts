export const formatNumberDecimal = (num: string, decimalPlaces = 0) => {
  const value = Number(num)
  if (Number.isNaN(value)) {
    return 'Invalid Number';
  }
  // Check if the number has decimal places
  const hasDecimal = value % 1 !== 0;

  // Check if decimalPlaces is provided and a non-negative integer
  if (hasDecimal && Number.isInteger(decimalPlaces) && decimalPlaces >= 0) {
    return value.toFixed(decimalPlaces);
  } else {
    // If decimalPlaces is not provided or invalid, return the number as is
    return value.toString();
  }
}
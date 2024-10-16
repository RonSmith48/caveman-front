export function displayValue(value) {
  if (value === null || value === undefined) {
    return '';
  } else if (typeof value === 'string') {
    if (value.includes('.')) {
      return parseFloat(value);
    } else {
      return value;
    }
  } else if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  } else if (typeof value === 'number') {
    return value.toString();
  } else {
    return value.toString(); // You can customize the display for other types as needed
  }
}

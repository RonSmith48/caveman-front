/**
 * Converts an SHKEY string to a readable date and shift format.
 * @param {string} shkey - The 10-character SHKEY string.
 * @returns {string} - The formatted date and shift (e.g., "2024-12-14 NS").
 * @throws {Error} - Throws an error if the input is invalid.
 */
export function shkeyToShift(shkey) {
  if (!shkey || shkey.length !== 10) {
    throw new Error('Invalid input: The input string must be exactly 10 characters long.');
  }

  const year = shkey.slice(0, 4);
  const month = shkey.slice(4, 6);
  const day = shkey.slice(6, 8);
  const finalDigit = shkey[9];

  let formattedDate = `${day}-${month}-${year} `;

  if (finalDigit === '2') {
    formattedDate += 'NS'; // Night Shift
  } else {
    formattedDate += 'DS'; // Day Shift
  }

  return formattedDate;
}

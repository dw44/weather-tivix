// stringified numbers. adds a leading zero to single digit numbers
function addZero(num) {
  const stringified = String(num);
  if (stringified.length === 1) {
    return `0${stringified}`;
  }

  return stringified;
}

export default addZero;

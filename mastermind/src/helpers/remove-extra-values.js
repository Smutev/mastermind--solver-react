export default function removeExtraValues(set, currentNumber, black, white) {
  return set
    .map(setItem => {
      let currentBlack = 0;
      let currentWhite = 0;

      [...setItem].forEach((foundDigit, i) => {
        if (currentNumber.includes(foundDigit)) {
          setItem[i] === currentNumber[i] ? currentBlack++ : currentWhite++;
        }
      });

      if (currentBlack === black && currentWhite === white) {
        return setItem;
      }
    })
    .filter(v => v);
}

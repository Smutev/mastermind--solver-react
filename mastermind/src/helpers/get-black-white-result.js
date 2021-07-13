export default function getBlackWhiteResult(hiddenNumber, selectedNumber) {
  let black = 0;
  let white = 0;

  [...hiddenNumber].forEach((hiddenDigit, i) => {
    if (selectedNumber.includes(hiddenDigit)) {
      selectedNumber[i] === hiddenDigit ? black++ : white++;
    }
  });

  return { black, white };
}

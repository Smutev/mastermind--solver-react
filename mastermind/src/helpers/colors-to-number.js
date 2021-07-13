import { COLORS } from "../constants/constants";

function convertColorsToNumber(points) {
  return points
    .map(point => {
      const { color } = point.props;
      const idx = COLORS.findIndex(defaultColor => color === defaultColor);
      if (idx !== -1) {
        return idx + 1;
      }
    })
    .join('');
}

export default convertColorsToNumber;

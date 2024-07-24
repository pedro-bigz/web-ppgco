import { RgbaColor } from "react-colorful";
import { getHex } from "utils/strings";

export const convertRgbaToHex = ({ r, g, b, a }: RgbaColor) => {
  return "#" + getHex(r) + getHex(g) + getHex(b) + getHex(255 * a);
};

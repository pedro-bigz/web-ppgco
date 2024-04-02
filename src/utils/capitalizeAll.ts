import _capitalize from "lodash/capitalize";

export const capitalizeAll = (text: string) => {
  return text.split(" ").map(_capitalize).join(" ");
};

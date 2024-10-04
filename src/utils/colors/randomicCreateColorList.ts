export function randomicCreateColorList(length: number, colors: string[]) {
  const colorList: string[] = [];
  const maxColors = Math.min(length, colors.length);

  while (colorList.length < maxColors) {
    const color = colors[Math.floor(Math.random() * colors.length)];

    if (!colorList.includes(color)) {
      colorList.push(color);
    }
  }

  return colorList;
}

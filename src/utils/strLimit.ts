export function strLimit(text: string, limit = 40, spread = "...") {
  if (text.length <= limit) return text;
  return text.substring(0, limit) + spread;
}

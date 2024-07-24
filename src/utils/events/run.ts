export function run(callback: (...args: any[]) => void, ...args: any[]) {
  return () => callback(...args);
}

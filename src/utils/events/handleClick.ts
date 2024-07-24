import { GenericFunction } from "utils/functions";

export function handleClick(
  callback: GenericFunction<any, void>,
  ...args: any[]
) {
  return () => {
    callback(...args);
  };
}

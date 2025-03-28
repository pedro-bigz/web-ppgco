import { MouseEvent } from "react";

export function handleNotPropagedClick(e: MouseEvent<HTMLDivElement>) {
  e.preventDefault();
  e.stopPropagation();
}

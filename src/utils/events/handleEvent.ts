import { ChangeEvent } from "react";

export interface HandleEventCallback {
  (value: string): void;
}

export type InputElements =
  | HTMLInputElement
  | HTMLOptionElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

export function handleEvent<T extends InputElements = InputElements>(
  callback: HandleEventCallback
) {
  return (e: ChangeEvent<T>) => {
    return callback(e.target.value);
  };
}

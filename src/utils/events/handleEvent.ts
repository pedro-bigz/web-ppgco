import { ChangeEvent } from "react";

interface HandleEventCallback {
  (value: string): void;
}
type InputElements =
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

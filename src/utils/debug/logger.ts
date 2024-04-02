import { NODE_ENV } from "core";

export const logger = {
  debug(...args: any[]) {
    if (NODE_ENV) {
      console.debug("[DEBUG...]", ...args);
    }
  },
};

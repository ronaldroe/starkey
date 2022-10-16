import Logger from "./Logger.js";

export default class StarkeyError extends Error {
  constructor(errorInputString) {
    super(errorInputString);

    Logger.error({
      error: true,
      ...this
    });
  }
};

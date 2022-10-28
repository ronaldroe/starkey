import Logger from "./Logger.js";

/**
 * @classdesc Error class for custom error handling
 *
 * @name StarkeyError
 * @class
 * 
 * @extends Error
 */
export default class StarKeyError extends Error {
  /**
   * @param {string} errorInputString Message for the error
   * 
   * @returns {StarKeyError}
   */
  constructor(errorInputString) {
    super(errorInputString);

    Logger.error({
      error: true,
      ...this
    });
  }
};

import { writeFile, readFileSync, existsSync } from 'fs';
import Loader from './Loader.js';

/**
 * @classdesc Class that logs to the requested log destination
 *
 * @name Logger
 * @class
 */
export default class Logger {
  static firehosePath = Loader.getConfig('logs.types.firehose.path');
  static errorPath = Loader.getConfig('logs.types.error.path');

  /**
   * @param {Object} [config={}] Global config and defaults will be set if not passed
   * @param {boolean} [config.firehoseAll=true] If not passed, checks global config, then falls back to true
   * @param {boolean} [config.toStdOut=true] If not passed, checks global config, then falls back to true
   * @param {boolean} [config.toStdErr=true] If not passed, checks global config, then falls back to true
   * 
   * @returns {Logger}
   */
  constructor (
    {
      firehoseAll,
      toStdOut,
      toStdErr
    } = {}
  ) {
    // Only override if set, default to what's in the config, then default to true
    this.firehoseAll = firehoseAll ?? Loader.getConfig('logs.config.firehoseAll') ?? true;
    this.toStdOut = toStdOut ?? Loader.getConfig('logs.config.toStdOut') ?? true;
    this.toStdErr = toStdErr ?? Loader.getConfig('logs.config.toStdErr') ?? true;
  }

  // Static methods
  /**
   * @method
   * @param {Object} input input data to log
   * 
   * @returns {undefined}
   */
  static log(input) {
    let currentLog = [];

    if (existsSync(Logger.firehosePath)) {
      try {
        currentLog = JSON.parse(readFileSync(Logger.firehosePath));
      } catch {
        currentLog = [];
      }
    }

    if (this.toStdOut) {
      console.log(JSON.stringify([...currentLog, { ...input, timestamp: new Date().toISOString() }], null, 2));
    }

    return writeFile(
      Logger.firehosePath,
      JSON.stringify([...currentLog, { ...input, timestamp: new Date().toISOString() }])
    );
  }

  /**
   * @method
   * @param {Object} input input data to log as error
   * @param {boolean} [toFirehose=true] whether the input will be logged to the firehose as well
   * 
   * @returns {undefined}
   */
  static error(input, toFirehose = this.firehoseAll) {
    // If we're logging to the firehose, do it
    if (toFirehose) {
      Logger.log(input);
    }

    let currentLog = [];

    if (existsSync(Logger.errorPath)) {
      try {
        currentLog = JSON.parse(readFileSync(Logger.errorPath));
      } catch {
        currentLog = [];
      }
    }

    if (this.toStdErr) {
      console.error(JSON.stringify([...currentLog, { ...input, timestamp: new Date().toISOString() }], null, 2));
    }

    return writeFile(
      Logger.errorPath,
      JSON.stringify([...currentLog, { ...input, timestamp: new Date().toISOString() }])
    );
  }

  /**
   * @method
   * @param {Object} input input data to log
   * @param {string} [name='custom'] name of custom log's config name. Default: 'custom'
   * @param {Boolean} [toFirehose=true] whether the input will be logged to the firehose as well
   * @param {Boolean} [toError=false] whether the input should be logged as an error
   * 
   * @returns {undefined}
   */
  static logCustom(input, name = 'custom', toFirehose = this.firehoseAll, toError = false) {
    // If we're logging to the firehose, do it
    if (toFirehose) {
      Logger.log(input);
    }

    let currentLog = [];
    const logPath = Loader.getConfig(`logs.types.${name}.path`);

    if (existsSync(logPath)) {
      try{
        currentLog = JSON.parse(readFileSync(logPath));
      } catch {
        currentLog = [];
      }
    }

    const notMinified = JSON.stringify([...currentLog, { ...input, timestamp: new Date().toISOString() }], null, 2);
    const minified = JSON.stringify([...currentLog, { ...input, timestamp: new Date().toISOString() }]);

    if (this.toStdOut) {
      console.log(notMinified);
    }

    // Write to firehose if enabled
    if (this.toFirehose) {
      writeFile(
        Logger.firehosePath,
        minified
      );
    }

    // Write to error log and stderr if enabled
    if (this.toError) {
      writeFile(
        Logger.errorPath,
        minified
      );

      if (toError) {
        console.error(notMinified);
      }
    }

    // Write to custom log location
    return writeFile(
      logPath,
      minified
    );
  }

  // Public methods. Since we aren't relying on data from a constructor, just call the static methods
  // This allows the child classes to use `this.log()`, etc

  /**
   * @method
   * @param {Object} input input data to log
   * 
   * @returns {undefined}
   */
  log(input) {
    return Logger.log(input);
  }

  /**
   * @method
   * @param {Object} input input data to log as error
   * @param {boolean} [toFirehose=true] whether the input will be logged to the firehose as well
   * 
   * @returns {undefined}
   */
  error(input, toFirehose = this.firehoseAll) {
    return Logger.error(input, toFirehose);
  }

  /**
   * @method
   * @param {Object} input input data to log
   * @param {string} [name='custom'] name of custom log's config name. Default: 'custom'
   * @param {boolean} [toFirehose=true] whether the input will be logged to the firehose as well
   * @param {boolean} [toError=false] whether the input should be logged to the error log
   * 
   * @returns {undefined}
   */
  logCustom(input, name = 'custom', toFirehose = this.firehoseAll, toError = false) {
    return Logger.logCustom(input, Loader.getConfig(`logs.${name}`), toFirehose, toError);
  }
}

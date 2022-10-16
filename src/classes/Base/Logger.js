import { writeFile, readFileSync, existsSync } from 'fs';
import Loader from './Loader.js';

/**
 * Class that logs to the requested log.
 * 
 * @param {Object} [Obj={}] Settings for the logging system.
 */
export default class Logger {
  static firehosePath = Loader.getConfig('logs.types.firehose.path');
  static errorPath = Loader.getConfig('logs.types.error.path');

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
   * @param {Object} input input data to log
   * 
   * @returns undefined
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
   * @param {Object} input input data to log as error
   * @param {?Boolean} [toFirehose=true] whether the input will be logged to the firehose as well
   * 
   * @returns undefined
   */
  static error(input, toFirehose = Logger.firehoseAll) {
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
   * @param {Object} input input data to log
   * @param {string} [name='custom'] name of custom log's config name. Default: 'custom'
   * @param {?Boolean} [toFirehose=true] whether the input will be logged to the firehose as well
   * 
   * @returns undefined
   */
  static logCustom(input, name = 'custom', toFirehose = Logger.firehoseAll) {
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

    if (this.toStdOut) {
      console.log(JSON.stringify([...currentLog, { ...input, timestamp: new Date().toISOString() }], null, 2));
    }

    return writeFile(
      logPath,
      JSON.stringify([...currentLog, { ...input, timestamp: new Date().toISOString() }])
    );
  }

  // Public methods. Since we aren't relying on data from a constructor, just call the static methods
  // This allows the child classes to use `this.log()`, etc

  /**
   * @param {Object} input input data to log
   * 
   * @returns undefined
   */
  log(input) {
    return Logger.log(input);
  }

  /**
   * @param {Object} input input data to log as error
   * @param {?Boolean} [toFirehose=true] whether the input will be logged to the firehose as well
   * 
   * @returns undefined
   */
  error(input, toFirehose = this.firehoseAll) {
    return Logger.error(input, toFirehose);
  }

  /**
   * @param {Object} input input data to log
   * @param {string} [name='custom'] name of custom log's config name. Default: 'custom'
   * @param {?Boolean} [toFirehose=true] whether the input will be logged to the firehose as well
   * 
   * @returns undefined
   */
  logCustom(input, name = 'custom', toFirehose = this.firehoseAll) {
    return Logger.logCustom(input, Loader.getConfig(`logs.${name}`), toFirehose);
  }
}

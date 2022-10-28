import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import * as YAML from '../../helpers/YAML.js';

import { merge } from '../../helpers/index.js';
const LoaderError = Error;

/**
 * Configuration loader and retrieval class
 * 
 * @property {string} appDir Working directory
 * @private {object} config object
 */
class Loader {
  static appDir = process.env.PWD;
  static configPath = process.env.STARKEY_CONFIG_PATH ?? `${Loader.appDir}/starkey.yaml`;
  #config = YAML.parse(readFileSync(Loader.configPath, { encoding: 'utf-8' }).toString());
  static merge = merge;

  /**
   * Loader class
   */
  constructor(altConfigPath = null) {
    altConfigPath = altConfigPath ?? resolve(this.#config.altConfigPath);
    const altConfig = YAML.parse(readFileSync(altConfigPath, { encoding: 'utf-8' }).toString());

    this.#config = merge(this.#config, altConfig);
    console.log(JSON.stringify(this.#config, null, 2));
  }

  /**
   * Get requested config by path.
   * @method getConfig
   * 
   * @param {string} [path='*'] Dot-separated path to the requested data. Default "*", returns entire config object. Input must exist on the object
   * @example path = 'database.type'
   * 
   * @returns {any|null} Requested config setting(s)
   */
  getConfig(path = '*') {
    // * represents the entire config
    if (path === '*') {
      return this.#config;
    }

    // We aren't looking for the whole object, so go find what we want
    try{
      const pathArray = path.split('.');
      return this.recurseConfigPath(pathArray, this.#config);
    } catch (e) {
      // Don't exit, just log and return null
      console.error(e);
      console.error(`Path '${path}' could not be found`);
      return null;
    }
  }

  /**
   * Static version of the internal getConfig method that can be used anywhere
   * @method getConfig
   * @static
   * 
   * @param {string} [path='*'] Path to the requested data. Default "*", returns entire config object. Input must exist on the object
   * 
   * @returns {any|null} Requested config setting(s)
   */
  static getConfig(path = '*') {
    return new Loader().getConfig(path);
  }

  /**
   * Recursive function to walk down into the config object and return the requested data
   * @method recurseConfigPath
   * 
   * @param {string[]} pathArray Array containing the paths to the requested key
   * @param {Object} [configObj=this.#config] The object being traversed. 
   * @param {number} [idx=0] Current index. Used internally to determine where in the pathArray we are
   * 
   * @returns {any|null} Requested config setting(s)
   */
  recurseConfigPath(pathArray, configObj = this.#config, idx = 0) {
    // For each level of the array, get the next path
    let output;
    const currPath = pathArray[idx];

    // Push this object into the output
    output = configObj[currPath]
  
    if (typeof pathArray[++idx] !== 'undefined') {
      // The path goes deeper, recurse into the next index
      output = this.recurseConfigPath(pathArray, configObj[currPath], idx);
    }

    return output ?? null;
  }

  /**
   * Writes a configuration object to file
   * @method writeConfig
   * 
   * @param {object} configObj Complete config object to be written. If you need to merge a subset of
   * config changes, this class exposes lodash's merge function as a static method.
   * @example loader.writeConfig(Loader.merge(loader.getConfig(), configChangeObj));
   * @param {string?} [configPath=Loader.configPath] 
   * @returns {undefined}
   */
  writeConfig(configObj, configPath = Loader.configPath) {
    // Make sure the config object is actually an object.
    if (Array.isArray(configObj)) {
      throw new LoaderError('Input must be an object. Array passed.');
    }

    try {
      JSON.stringify(configObj);
    } catch (e) {
      throw new LoaderError(`Input must be an object. ${typeof configObj} passed`);
    }

    return writeFileSync(configPath, YAML.stringify(configObj));
  }

  /**
   * Generates a configuration object as either a JavaScript object or yaml string from a default merged
   * with an optional configuration.
   * @method generateConfig
   * 
   * @param {object?} [configObj={}] Configuration object to be merged with the default config.
   * If omitted, will return the default config
   * @param {boolean?} [asObject=true] If true or omitted, returns JavaScript object. If false, returns yaml string
   * @returns {object|string} 
   */
  generateConfig(configObj = {}, asObject = true) {
    const defaultConfig = {
      altConfigPath: "./starkey.yaml",
      pluginPath: "./plugins",
      logs: {
        types: {
          firehose: {
            path: "./logging/firehose.log",
            format: "json"
          },
          error: {
            path: "./logging/error.log",
            format: "json"
          },
          custom: {
            path: "./logging/custom.log",
            format: "json"
          }
        },
        config: {
          toStdOut: true,
          toStdErr: true,
          firehoseAll: true
        }
      },
      security: {
        user: {
          strategy: "local"
        }
      },
      database: {
        queryPaths: [
          "./queries"
        ],
        path: "./data/starkey.db",
        type: "SQLite"
      }
    }

    configObj = merge(defaultConfig, configObj);

    if (asObject) {
      return configObj;
    }

    return YAML.stringify(configObj);
  }

  /**
   * Returns the config object as a JSON serialized string. This is a stub for future work, but needed soon
   * @method toJSON
   * 
   * @returns {string}
   */
  toJSON() {
    return JSON.stringify(this.#config);
  }

  /**
   * Retrieves plugin classes and exports as an object with the plugin's class name as its key.
   * All plugins are loaded into memory on startup
   * 
   * @param {string} [path='*'] plugin type path. Must be one of ['*', 'connectors', 'TBD']
   */
  getPluginsByType(path = '*') {
    if (!this.plugins) {
      return this.getPluginsFromFile(path);
    }

    const pluginPath = this.getConfig('pluginPath');
    const pluginDirObj = this.getDirectoryPaths(pluginPath);

    return this.getPluginsFromMemory(path);
  }

  getPluginsFromFile(path = '*') {

  }

  getPluginsFromMemory(path = '*') {

  }
}

export default Loader;

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import * as YAML from '../../helpers/YAML.js';

import { merge } from '../../helpers/index.js';
const LoaderError = Error;

/**
 * @classdesc Configuration loader and retrieval class
 *
 * @name Loader
 * @class
 * 
 * @property {string} appDir Working directory
 * @private {object} config object
 */
class Loader {
  static appDir = process.env.PWD;
  static configPath = process.env.STARKEY_CONFIG_PATH ?? `${Loader.appDir}/starkey.yaml`;
  #config = YAML.parse(readFileSync(Loader.configPath, { encoding: 'utf-8' }).toString());
  static merge = merge;
  static resolve = resolve;

  /**
   * Provides loading for config and static files
   * 
   * @param {string[]|null} [altConfigPaths=null] Paths to alternate configuration
   */
  constructor(altConfigPaths = null) {
    altConfigPaths = altConfigPaths ?? this.#config.altConfigPaths.map((path) => resolve(path));
    console.log(altConfigPaths);
    const altConfigs = altConfigPaths.map((path) => YAML.parse(readFileSync(path, { encoding: 'utf-8' }).toString()));

    this.#config = this.generateConfig([this.#config, ...altConfigs]);
  }

  /**
   * Get requested config by path.
   * @method getConfig
   * 
   * @param {string|string[]} [path='*'] Array or dot-separated path to the requested data. Default "*", returns entire config object. Input must exist on the object
   * @example path = 'database.type'
   * @example path = ['database', 'type']
   * 
   * @returns {any|null} Requested config setting(s) or null if the config could not be found
   */
  getConfig(path = '*') {
    // * represents the entire config. If it's a string, that character will be the 0th index of it,
    // so this will catch it regardless of whether it's an array.
    if (path[0] === '*') {
      return this.#config;
    }

    // If it's not an array, make it one
    if (!Array.isArray(path)) {
      path = path.split('.');
    }

    // We aren't looking for the whole object, so go find what we want
    try{
      return this.recurseConfigPath(path, this.#config);
    } catch (e) {
      // Don't exit, just log and return null
      console.error(e);
      console.error(`Path '${path.join('.')}' could not be found`);
      return null;
    }
  }

  /**
   * Static version of the internal getConfig method that can be used anywhere
   * @method getConfig
   * @static
   * 
   * @param {string|string[]} [path='*'] Array or dot-separated path to the requested data. Default "*", returns entire config object. Input must exist on the object
   * @example path = 'database.type'
   * @example path = ['database', 'type']
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
   * @param {object} configObj Complete config object to be written. 
   * @example loader.writeConfig(Loader.merge(loader.getConfig(), configChangeObj));
   * @param {string} [configPath=Loader.configPath]
   * 
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
   * @param {Object|Object[]} [configObj={}] Configuration object to be merged with the default config.
   * If omitted, will return the default config
   * @param {boolean} [asObject=true] If true or omitted, returns JavaScript object. If false, returns yaml string
   * @param {boolean} [fromDefault=true] Whether to include the default config as a base config or use the in-memory config
   * 
   * @returns {object|string} 
   */
  generateConfig(configObjs = {}, asObject = true, fromDefault = true) {
    const defaultConfig = fromDefault
      ? YAML.parse(readFileSync(`${Loader.appDir}/starkey.yaml.default`, { encoding: 'utf-8' }).toString())
      : this.#config;

    let configOutput = configObjs;

    if (Array.isArray(configObjs)) {
      configOutput = merge(...configObjs);
    }

    configOutput = merge(defaultConfig, configOutput);

    if (asObject) {
      return configOutput;
    }

    return YAML.stringify(configOutput);
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
   * @param {string} [type='*'] plugin type. Must be one of ['*', 'connectors', 'TBD']
   * @param {boolean} [forceReload=false] Force plugins to be loaded from disk
   * 
   * @returns {object}
   */
  getPluginsByType(type = '*', forceReload = false) {
    if (!this.plugins || forceReload) {
      this.plugins = this.getPluginsFromFile(type);
      return this.plugins;
    }

    return this.getPluginsFromMemory(type);
  }

  getPluginsFromFile(type = '*') {

  }

  getPluginsFromMemory(type = '*') {

  }
}

export default Loader;

import { readFileSync } from 'fs';
import { resolve } from 'path';
import lodash from 'lodash';
const { merge } = lodash;

/**
 * This is the true "base" class. It loads the config and provides methods for
 * retrieving settings.
 */
export default class Loader {
  static appDir = process.env.PWD;
  #config = JSON.parse(readFileSync(`${Loader.appDir}/starkey.config.json`));

  constructor() {
    const altConfigPath = resolve(this.#config.altConfigPath);
    const altConfig = JSON.parse(readFileSync(altConfigPath));

    this.#config = merge(this.#config, altConfig);
  }

  /**
   * Get requested config by path.
   * 
   * @param {string} [path='*'] Dot-separated path to the requested data. Default "*", returns entire config object. Input must exist on the object
   * @example path = 'data.databasePath'
   * 
   * @returns {*|null} Requested config setting(s)
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
   * 
   * @param {string} [path='*'] Path to the requested data. Default "*", returns entire config object. Input must exist on the object
   * 
   * @returns {*} Requested config setting(s)
   */
  static getConfig(path = '*') {
    return new Loader().getConfig(path);
  }

  /**
   * Recursive function to walk down into the config object and return the requested data
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
}

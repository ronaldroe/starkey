import { writeFileSync, readFileSync, existsSync, readdirSync } from 'fs';
import { writeFile, readFile, exists, readdir } from 'fs/promises';
import Loader from './Loader';
import DiskAccessObjectError from './Error.js';

const fileSysFuncs = [
  writeFileSync,
  readFileSync,
  existsSync,
  readdirSync,
  writeFile,
  readFile,
  exists,
  readdir
]

/**
 * @classdesc Provides an interface for accessing and retrieving static files from the local FS
 *
 * @name DiskAccessObject
 * @class
 */
export default class DiskAccessObject {
  constructor() {
    // Attach Node's FS functions to the class for easy access
    this.attachFileSysFuncs();
  }

  /**
   * Attaches file system functions to the object
   */
  attachFileSysFuncs() {
    fileSysFuncs.forEach((func) => {
      this[func.name] = func;
    });
  }

  /**
   * Reads and returns the contents of a directory
   * 
   * @param {string} path path to be loaded from
   * @param {boolean} recurse whether to recurse into child folders
   */
  readDirectory(path = Loader.appPath, recurse = false) {
    if (!existsSync(path)) {
      throw new DiskAccessObjectError(`Path '${path}' does not exist or you do not have permission to read it`);
    }
  }
}
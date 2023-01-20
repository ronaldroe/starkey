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
 * @classdesc Provides an interface for accessing and retrieving static files from the local fs.
 * Node's writeFile, readFile, readdir and exists are all available as methods on this class in
 * both their synchronous and promise-based versions.
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
   * 
   * @returns {undefined}
   */
  attachFileSysFuncs() {
    fileSysFuncs.forEach((func) => this[func.name] = func);
  }
}

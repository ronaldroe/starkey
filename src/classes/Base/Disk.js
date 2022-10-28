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

export default class DiskAccessObject {
  constructor() {
    // Attach Node's FS functions to the class for easy access
    this.attachFileSysFuncs();
  }

  attachFileSysFuncs() {
    fileSysFuncs.forEach((func) => {
      this[func.name] = func;
    });
  }

  readDirectory(path = Loader.appPath, recurse = false) {
    if (!existsSync(path)) {
      throw new DiskAccessObjectError(`Path '${path}' does not exist or you do not have permission to read it`);
    }
  }
}
import { readFileSync, existsSync, constants } from 'fs'; // https://nodejs.org/docs/latest-v18.x/api/fs.html#fspromisesaccesspath-mode
import { readFile, access } from 'fs/promises';
import Logger from '../Base/Logger';

export default class PluginBase extends Logger {

}

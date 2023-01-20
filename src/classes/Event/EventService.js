import { EventEmitter } from 'node:events';
import { resolve } from 'node:path';
import Loader from '../Base/Loader.js';
import Logger from '../Base/Logger.js';
import EventError from '../Base/Error.js';

/**
 * @classdesc Provides event bus for app. Can use the Node event system, or be configured to use a nats server
 * 
 * @name EventService
 * @class
 */
export default class EventService extends EventEmitter {
  constructor() {
    super();
  }
}
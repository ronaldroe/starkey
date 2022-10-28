import DAOError from "../Base/Error.js";
import { Loader, Logger } from "../Base/index.js";
import * as Connectors from '../Data/Connectors/index.js';

const connector = Loader.getConfig('database.type');

/**
 * @classdesc Data access layer. Sits in front of the connector.
 *
 * @name DataAccessObject
 * @class
 * 
 * @extends {Connectors}
 */
export default class DataAccessObject extends Connectors[connector] {
  dbType = connector;

  /**
   * @returns {DataAccessObject}
   */
  constructor() {
    try {
      super();
    } catch {
      throw new DAOError(`Connector '${this.dbType}' does not have a constructor.`);
    }
  }

  /**
   * Retrieves the plugin classes, returning them in an object keyed by their name
   * 
   * @returns {object}
   */
  getPluginConnectors() {
    return DataAccessObject.getPluginConnectors();
  }

  /**
   * Retrieves the plugin classes, returning them in an object keyed by their name
   * @static
   * 
   * @returns {object}
   */
  static getPluginConnectors() {
    return Loader.getPluginsByType('connectors');
  }
}

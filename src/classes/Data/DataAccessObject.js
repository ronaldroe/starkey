import DAOError from "../Base/Error.js";
import { Sequelize } from "sequelize";
import { Loader, Logger } from "../Base/index.js";

/**
 * @classdesc Data access layer. 
 *
 * @name DataAccessObject
 * @class
 * 
 * @extends {Connectors}
 */
export default class DataAccessObject  {
  type = Loader.getConfig('database.type');
  path = Loader.getConfig('database.path');
  host = Loader.getConfig('database.host');
  port = Loader.getConfig('database.port')
  database = Loader.getConfig('database.name');

  constructor() {
    this.#connection = new Sequelize({
      host: this.host ?? 'localhost',
      port: this.port,
      database: this.database ?? 'starkey',
      storage: this.path ?? ':memory:', // Ignored if not sqlite
      dialect: this.type ?? 'sqlite',
      username: process.env.STARKEY_DATABASE_USER,
      password: process.env.STARKEY_DATABASE_PASS
    })
  }
}

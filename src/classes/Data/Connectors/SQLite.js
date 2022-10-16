import { Logger } from "../../Base/index.js";
import Connector from "./Connector.js";
import SQLite from "better-sqlite3";

/**
 * Connector for use with SQLite. On startup, converts all queries to prepared statements ready for execution.
 * 
 * @param {Boolean} userAuthd If true, enables write access
 * 
 * @returns {SQLiteConnector}
 */
export default class SQLiteConnector extends Connector {
  #sqlite = SQLite;
  #connection = {};

  // Map methods to some aliases
  insert = this.create;
  select = this.read;
  get = this.read;
  run = this.exec;

  constructor(userAuthd = false) {
    super(userAuthd);
  }

  /**
   * Sets the connection object
   * 
   * @returns {SQLiteConnector}
   */
  connect() {
    try {
      this.#connection = new this.#sqlite(this.dataPath, { readonly: this.getReadOnly() });
    } catch (error) {
      this.throwDBError(error.message);
    }

    Logger.log('Database connection established');
    return this;
  }

  /**
   * Returns the connection object
   * 
   * @returns {Object} connection object
   */
  getConnection() {
    return this.#connection;
  }

  /**
   * Executes DQL queries
   * 
   * @param {string} inputQuery Parameterized query input, i.e.: SELECT * FROM Table WHERE field = ?
   * @param {Array|Object} [values=[]] values for parameterized query
   * @returns {Object} query result
   */
  read(inputQuery, values = []) {
    // The parent method validates that this method is called from here
    // and that the proper type of query was passed
    super.read(inputQuery, values);

    return this.exec(inputQuery, values);
  }

  /**
   * Executes DML INSERT queries
   * 
   * @param {string} inputQuery Parameterized query input, i.e.: INSERT INTO Table (field) VALUES (?)
   * @param {Array|Object} values values for parameterized query
   * @returns {Object} query result
   */
  create(inputQuery, values) {
    // The parent method validates that this method is called from here,
    // that the proper type of query was passed, and that the user
    // has the appropriate permission
    super.create(inputQuery, values);

    return this.exec(inputQuery, values);
  }

  /**
   * Executes DML UPDATE queries
   * 
   * @param {string} inputQuery Parameterized query input, i.e.: UPDATE Table SET field = ? WHERE otherField = ?
   * @param {Array|Object} values values for parameterized query
   * @returns {Object} query result
   */
  update(inputQuery, values) {
    // The parent method validates that this method is called from here,
    // that the proper type of query was passed, and that the user
    // has the appropriate permission
    super.update(inputQuery, values);

    return this.exec(inputQuery, values);
  }

  /**
   * Executes DML DELETE queries
   * 
   * @param {string} inputQuery Parameterized query input, i.e.: DELETE FROM Table WHERE field = ?
   * @param {Array|Object} values values for parameterized query
   * @returns {Object} query result
   */
  delete(inputQuery, values) {
    // The parent method validates that this method is called from here,
    // that the proper type of query was passed, and that the user
    // has the appropriate permission
    super.delete(inputQuery, values);

    return this.exec(inputQuery, values);
  }

  /**
   * Executes a query as a prepared statement
   * 
   * @param {string} inputQuery Parameterized query input
   * @param {Array|Object} values values for parameterized query
   * @returns {Object} query result
   */
  exec(inputQuery, values) {
    const conn = this.#connection;
    conn.prepare(inputQuery);

    return conn.run(values);
  }

  /**
   * Static helper method that can build simple select queries programatically
   * 
   * @param {string} tableName Name of the db table
   * @param {?string[]} [description=['*']] Array of strings containing field names. Does not support subqueries. Aliases should be included in the string "foo AS bar"
   * @example description = ['first_name', 'last_name']
   * @param {?Object[]} [wheres] Object containing field, type and value of each where clause input. 
   * @param {?string} [wheres[].type='='] Must be one of ['=', 'LIKE', 'IN']
   * @param {any|any[]} wheres[].value If type is 'IN', this must be an array
   * @example wheres = [{ field: 'first_name', type: 'LIKE', value: '%John%' }, { field: 'ID', type: 'IN', value: [1, 2, 3]}]
   * @param {?Object[]} [orderBys] Object containing field and type of each order by clause input.
   * @param {?string} [orderBys[].type='ASC'] Must be one of ['ASC', 'DESC']
   * @example orderBys = [{ field: 'first_name', type: 'DESC' }]
   * @param {?number} [limit] query return limit
   * @param {?number} [offset] query return offset
   * @returns {string} SQL query
   */
  static buildSimpleSelect(
    tableName,
    description = ['*'],
    wheres = null,
    orderBys = null,
    limit = null,
    offset = null
  ) {
    // Build the description and from fields
    let sql = `SELECT
      ${description.join(`, `)}
    FROM ${tableName}`;

    // If we have inputs for the where clause, loop over and add them
    if (wheres) {
      sql += `
      WHERE `;
  
      const mappedWheres = wheres.map(({ field, value, type }) => {
        if (!type) type = '=';

        let output = `${field} ${type.toUpperCase()} `;
  
        if (type === 'IN') {
          if (!Array.isArray(value)) {
            this.throwDBError('value must be an Array if type is `IN`');
          }

          output += `(${value.join(', ')})`
          return output;
        }

        if (Array.isArray(value)) {
          this.throwDBError('value may only be an Array if type is `IN`');
        }

        output += value;
        return output;
      });

      sql += mappedWheres.join(', ');
    }

    // Loop over and add order by if it exists
    if (orderBys) {
      sql += `
      ORDER BY `;

      const mappedOrderBys = orderBys.map(({ field, type }) => {
        if (!type) type = 'ASC';

        return `${field} ${type.toUpperCase()}`;
      });

      sql += mappedOrderBys.join(', ');
    }

    // Add limit if it exists
    if (limit) {
      sql += `
      LIMIT ${limit}`;
    }

    // Add offset if it exists
    if (offset) {
      sql += `
      OFFSET ${offset}`;
    }

    return sql;
  }
}
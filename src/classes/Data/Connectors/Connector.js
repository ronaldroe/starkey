import { Loader } from "../../Base/index.js";
import DatabaseError from '../../Base/Error.js';

import lodash from 'lodash';
const { intersection } = lodash;

export default class Connector {
  dataPath = Loader.getConfig('database.path');
  #shouldReadOnly = false;

  /**
   * Connector base class. A database agnostic base class for database connectors. Provides basic user authorization,
   * read/write flag. Checks for implementation of 1 connect and 4 CRUD methods, which must be implemented in the
   * child connector. JSDOCs are written assuming SQL
   * 
   * @param {Boolean} userAuthd Whether the current user is authorized for write access
   */
  constructor(userAuthd = false) {
    this.#setReadOnly(userAuthd);

    // If this is not the DAO, make sure the required methods exist
    if (!this.compareDAOProps() && !this.constructor.name.toLowerCase() === 'dataaccessobject') {
      this.throwDBError('Child connector does not implement all required methods');
    }
  }

  /**
   * Sets the read only flag for the DAO. Must be set for non-secure users
   * This will likely become automated later, and based on whether
   * 
   * @param {Boolean} shouldReadOnly 
   * @returns {Boolean}
   */
  #setReadOnly(shouldReadOnly = true) {
    this.#shouldReadOnly = shouldReadOnly;
    return this.#shouldReadOnly;
  }

  /**
   * Returns current read only status
   * 
   * @returns {Boolean}
   */
  getReadOnly() {
    return this.#shouldReadOnly;
  }

  /**
   * Stub to throw errors if the child connector doesn't implement this method
   * 
   * @throws {DatabaseError}
   */
  connect() {
    // Throw if user tries to call this on super
    if (this.constructor.name !== 'Connector') {
      this.throwDBError('Calling super.connect() is not supported');
    }

    // Throw if user tries to run method directly
    this.throwDBError('The connect() must be implemented in the child class');
  }

  /**
   * Executes DQL queries
   * 
   * @param {string} inputQuery Parameterized query input, i.e.: SELECT * FROM Table WHERE field = ?
   * @param {Array|Object} values
   * 
   * @returns {Object} Database query result
   * @throws {DatabaseError}
   */
  read(inputQuery, values) {
    if (this.constructor.name === 'Connector') {
      this.throwDBError('This method must be implemented in the connector');
    }
    if (!inputQuery.toLowerCase().includes('select')) {
      this.throwDBError('This method requires a SELECT query');
    }
  }


  /**
   * Executes DML INSERT queries
   * 
   * @param {string} inputQuery Parameterized query input, i.e.: INSERT INTO Table (field) VALUES (?)
   * @param {Array|Object} values
   * 
   * @returns {Object} Database query result
   * @throws {DatabaseError}
   */
  create(inputQuery, values) {
    if (this.constructor.name === 'Connector') {
      this.throwDBError('This method must be implemented in the connector');
    }
    if (!inputQuery.toLowerCase().includes('insert')) {
      this.throwDBError('This method requires an INSERT query');
    }
    if (this.#shouldReadOnly) {
      this.throwDBError('User is readonly');
    }
  }


  /**
   * Executes DML UPDATE queries
   * 
   * @param {string} inputQuery Parameterized query input, i.e.: UPDATE Table SET field = ? WHERE otherField = ?
   * @param {Array|Object} values
   * 
   * @returns {Object} Database query result
   * @throws {DatabaseError}
   */
  update(inputQuery, values) {
    if (this.constructor.name === 'Connector') {
      this.throwDBError('This method must be implemented in the connector');
    }
    if (!inputQuery.toLowerCase().includes('update')) {
      this.throwDBError('This method requires an UPDATE query');
    }
    if (this.#shouldReadOnly) {
      this.throwDBError('User is readonly');
    }
  }


  /**
   * Executes DML DELETE queries
   * 
   * @param {string} inputQuery Parameterized query input, i.e.: DELETE FROM Table WHERE field = ?
   * @param {Array|Object} values
   * 
   * @returns {Object} Database query result
   * @throws {DatabaseError}
   */
  delete(inputQuery, values) {
    if (this.constructor.name === 'Connector') {
      this.throwDBError('This method must be implemented in the connector');
    }
    if (!inputQuery.toLowerCase().includes('delete')) {
      this.throwDBError('This method requires a DELETE query');
    }
    if (this.#shouldReadOnly) {
      this.throwDBError('User is readonly');
    }
  }

  /**
   * Executes query
   * 
   * @param {string} inputQuery Parameterized query to run
   * @param {Array|Object} values query parameters
   * @throws {DatabaseError}
   */
  exec(inputQuery, values) {
    if (this.constructor.name === 'Connector') {
      this.throwDBError('This method must be implemented in the connector');
    }
  }

  /**
   * Throws database related error
   * 
   * @param {string} message 
   */
  throwDBError(message) {
    throw new DatabaseError(message);
  }

  /**
   * Compares the methods and properties to the list of required items. 
   * 
   * @returns {Boolean}
   */
  compareDAOProps() {
    const requiredDAOProps = [
      'create',
      'read',
      'update',
      'delete',
      'connect'
    ];

    const currentDAOProps = Object.getOwnPropertyNames(Object.getPrototypeOf(this));

    const DAOintersect = intersection(requiredDAOProps, currentDAOProps);

    return DAOintersect.length === requiredDAOProps.length;
  }
}
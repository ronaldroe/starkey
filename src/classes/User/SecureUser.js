import { Mixin } from 'ts-mixer';
import User from './User.js';
import { Security } from '../Base';

// Should eventually also extend the permissions/role management

/**
 * @classdesc Authenticated, secure user class for protected actions. Handles IAM.
 *
 * @name SecureUser
 * @class
 * 
 * @extends User
 * @extends Security
 */
export default class SecureUser extends Mixin(User, Security) {
  constructor() {
    super();
  }
};

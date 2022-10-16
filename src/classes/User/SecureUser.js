import { Mixin } from 'ts-mixer';
import User from './User.js';
import { Security } from '../Base';

export default class SecureUser extends Mixin(User, Security) {
  constructor() {
    super();
  }
};

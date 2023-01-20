import { Base } from '../Base';

/**
 * @classdesc Base user class. Can be used for non-secured assets/endpoints.
 *
 * @name User
 * @class
 * 
 * @extends {Base}
 */
export default class User extends Base {
  /**
   * @param {number} [userId=0]
   * 
   * @returns {User}
   */
  constructor(userId = 0) {
    super();
  }
};

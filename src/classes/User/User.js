import { Base } from '../Base';

/**
 * Base user class. Can be used for non-secured assets/endpoints.
 * 
 * @extends {Base}
 */
export default class User extends Base {
  /**
   * @param {?number} [userId=0]
   * 
   * @returns {User}
   */
  constructor(userId = 0) {
    super();
  }
};

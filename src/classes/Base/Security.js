import Express from 'express';
import Session from 'express-session';
import Passport from 'passport';
import { Many } from 'ts-mixer';
import { Strategy as local} from 'passport-local';
import { Strategy as facebook} from 'passport-facebook';
import { Strategy as google } from 'passport-google-oauth2';

import Loader from './Loader.js';
import SecurityError from './Error.js';

/**
 * Provides security interface layer
 * 
 * @returns Security
 */
export default class Security extends Many(Express, Session, Passport) {
  strategies = {
    default: 'local',
    local,
    facebook,
    google
  };

  /**
   * Security class constructor
   * 
   * @param {string} [strategy=null] Name of strategy to be used
   * 
   * @returns {Security}
   */
  constructor(strategy = null) {
    // Get strategy from the config
    const configStrategy = Loader.getConfig('security.user.strategy');

    // Priority goes from strategy passed to the constructor, strategy from config, then default (local)
    this.strategyName = strategy ?? configStrategy ?? this.strategies[this.strategies.default];

    // Strategy must exist
    if (!this.strategies[this.strategyName]) {
      throw new SecurityError(`${this.strategyName} does not exist`);
    }

    this.strategy = this.strategies[this.strategyName];
  }
};

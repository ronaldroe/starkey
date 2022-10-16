import { Loader, Logger } from "../Base/index.js";
import * as Connectors from '../Data/Connectors/index.js';

const connector = Loader.getConfig('database.type');

export default class DataAccessObject extends Connectors[connector] {
  dbType = connector;

  constructor() {
    super();
  }
}

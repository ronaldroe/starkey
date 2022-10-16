import DataAccessObject from "./src/classes/Data/DataAccessObject.js";

(async () => {
  const DAO = new DataAccessObject();
  console.log(DAO.connect())
})();

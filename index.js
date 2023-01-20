import Loader from "./src/classes/Base/Loader.js";

(async () => {
  const load = new Loader();
  const config = load.generateConfig([{}, load.getConfig('*')]);
  console.log(config);
})();

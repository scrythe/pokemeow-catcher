import { writePokemonCatchMessage } from './functions/catch-pokemon.js';
import { initializeEnviroment } from './functions/initialize-enviroment.js';

(async () => {
  const { page } = await initializeEnviroment({ newTab: false });
  await writePokemonCatchMessage(page);
})();

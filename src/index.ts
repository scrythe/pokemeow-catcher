import { writePokemonCatchMessage } from './catch-pokemon.js';
import { initializeEnviroment } from './initialize-enviroment.js';

(async () => {
  const { page } = await initializeEnviroment({ newTab: false });
  await writePokemonCatchMessage(page);
})();

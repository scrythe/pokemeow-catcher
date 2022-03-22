import { startPokemonCatch } from './functions/catch-pokemon.js';
import { initializeEnviroment } from './functions/initialize-enviroment.js';

(async () => {
  const { page } = await initializeEnviroment({ newTab: false });
  await startPokemonCatch(page);
  console.log('done');
})();

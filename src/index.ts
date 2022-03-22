import { startPokemonCatch } from './functions/catch-pokemon.js';
import { initializeEnviroment } from './functions/initialize-enviroment.js';

(async () => {
  const { browser, page } = await initializeEnviroment({ newTab: true });
  await startPokemonCatch(page, 9);
  await browser.close();
  console.log('done');
})();

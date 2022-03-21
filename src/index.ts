import { getLoginData } from './get-data.js';
import {
  loginToDiscord,
  openDiscordPokemonChannel,
} from './login-open-channel.js';
import { writePokemonCatchMessage } from './catch-pokemon.js';
import { openBrowserAndPage } from './open-browser-page.js';

(async () => {
  const loginData = await getLoginData();
  if (!loginData) return;
  const { email, password } = loginData;
  const { browser, page } = await openBrowserAndPage({ newTab: false });
  await loginToDiscord(page, email, password);
  await openDiscordPokemonChannel(page);
  await writePokemonCatchMessage(page);
})();

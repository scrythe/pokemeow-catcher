import { getLoginData } from './get-data.js';
import {
  loginToDiscord,
  openDiscordPokemonChannel,
} from './login-open-channel.js';
import { writePokemonCatchMessage } from './catch-pokemon.js';
import { openBrowser, openPage } from './open-browser-page.js';

(async () => {
  const loginData = await getLoginData();
  if (!loginData) return;
  const { email, password } = loginData;
  const browser = await openBrowser({ newBrowser: false });
  if (!browser) throw Error('Browser not found');
  const page = await openPage({ browser, newPage: false });
  await loginToDiscord(page, email, password);
  await openDiscordPokemonChannel(page);
  await writePokemonCatchMessage(page);
})();

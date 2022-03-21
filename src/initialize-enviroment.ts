import { openBrowserAndPage } from './open-browser-page.js';
import {
  loginToDiscord,
  openDiscordPokemonChannel,
} from './login-open-channel.js';
import { BrowserPage } from './interfaces';
import { getLoginData } from './get-data.js';

export async function initializeEnviroment({
  newTab = true,
}): Promise<BrowserPage> {
  const { browser, page } = await openBrowserAndPage({ newTab });
  if (newTab) {
    const loginData = await getLoginData();
    if (!loginData) throw Error('No Login Data found');
    const { email, password } = loginData;
    await loginToDiscord(page, email, password);
    await openDiscordPokemonChannel(page);
  }
  return { browser, page };
}

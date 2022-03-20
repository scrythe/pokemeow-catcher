import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFile } from 'fs/promises';
import {
  loginToDiscord,
  openDiscordPokemonChannel,
} from './login-open-channel.js';
import { writePokemonCatchMessage } from './catch-pokemon.js';
import { openBrowser } from './open-browser-page.js';
import { User } from './interfaces.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async () => {
  let dataPath = join(__dirname, '..', 'src', 'discord-login-data.json');
  const userLoginsText = await readFile(dataPath).catch((err) =>
    console.error(err)
  );
  if (!userLoginsText) return;
  const { email, password }: User = JSON.parse(userLoginsText.toString());
  const browser = await openBrowser({ newBrowser: true });
  const page = await browser.newPage();
  await loginToDiscord(page, email, password);
  await openDiscordPokemonChannel(page);
  await writePokemonCatchMessage(page);
})();

import puppeteer, { Page } from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async () => {
  let dataPath = join(__dirname, '..', 'src', 'discord-login-data.json');
  const userLoginsText = await readFile(dataPath).catch((err) =>
    console.error(err)
  );
  if (!userLoginsText) return;
  const { email, password }: User = JSON.parse(userLoginsText.toString());
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await loginToDiscord(page, email, password);
})();

interface User {
  email: string;
  password: string;
}

async function loginToDiscord(
  page: Page,
  email: string,
  password: string
): Promise<void> {
  await page.goto('https://discord.com/login');
  const emailBoxSelector =
    '#app-mount > div.app-3xd6d0 > div > div > div > div > form > div > div > div.mainLoginContainer-wHmAjP > div.block-3uVSn4.marginTop20-2T8ZJx > div.marginBottom20-315RVT > div > div.inputWrapper-1YNMmM.inputWrapper-3ESIDR > input';
  const passwordBoxSelector =
    '#app-mount > div.app-3xd6d0 > div > div > div > div > form > div > div > div.mainLoginContainer-wHmAjP > div.block-3uVSn4.marginTop20-2T8ZJx > div:nth-child(2) > div > input';
  await page.waitForSelector(emailBoxSelector);
  await page.waitForSelector(passwordBoxSelector);
  await page.type(emailBoxSelector, email);
  await page.type(passwordBoxSelector, password);
  const loginButtonSelector =
    '#app-mount > div.app-3xd6d0 > div > div > div > div > form > div > div > div.mainLoginContainer-wHmAjP > div.block-3uVSn4.marginTop20-2T8ZJx > button.marginBottom8-emkd0_.button-1cRKG6.button-f2h6uQ.lookFilled-yCfaCM.colorBrand-I6CyqQ.sizeLarge-3mScP9.fullWidth-fJIsjq.grow-2sR_-F';
  await page.waitForSelector(loginButtonSelector);
  await page.click(loginButtonSelector);
}

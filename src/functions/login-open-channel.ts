import { Page } from 'puppeteer';

export async function loginToDiscord(
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

export async function openDiscordPokemonChannel(page: Page): Promise<void> {
  const serverBtnSelector =
    '#app-mount > div.app-3xd6d0 > div > div.layers-OrUESM.layers-1YQhyW > div > div > nav > ul > div.scroller-3X7KbA.none-2-_0dP.scrollerBase-_bVAAt > div:nth-child(4) > div:nth-child(1) > div:nth-child(2) > div > div > svg > foreignObject > div';
  await page.waitForSelector(serverBtnSelector);
  await page.click(serverBtnSelector);
  await page.waitForSelector('#channels');
  await page.evaluate(() => {
    const scroll = document.querySelector('#channels');
    const scrollHeight = scroll?.scrollHeight || 0;
    scroll?.scrollBy(0, scrollHeight);
  });
  await page.waitForTimeout(1000);
  const pokemonChannelSelector =
    '#channels > ul > li:nth-child(19) > div > div > a > div.name-28HaxV.overflow-1wOqNV > div';
  await page.waitForSelector(pokemonChannelSelector);
  await page.click(pokemonChannelSelector);
}

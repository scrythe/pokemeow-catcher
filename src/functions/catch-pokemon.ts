import { Page } from 'puppeteer';

async function typeP(
  page: Page,
  typeMessageFieldSelecor: string
): Promise<void> {
  await page.type(typeMessageFieldSelecor, ';p');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000);
}

async function catchPokemon(page: Page): Promise<void> {
  await page.evaluate(() => {
    const messages = document.querySelectorAll(
      '[aria-label="Messages in pokemon"] li'
    );
    const message = messages[messages.length - 1];
    const pokeballButton = message.querySelector(
      'div > div > div > div > div > button:nth-child(1)'
    ) as HTMLElement;
    pokeballButton.click();
  });
  await page.waitForTimeout(4200);
}

export async function startPokemonCatch(
  page: Page,
  iterations: number
): Promise<void> {
  const typeMessageFieldSelecor =
    '#app-mount > div.app-3xd6d0 > div > div.layers-OrUESM.layers-1YQhyW > div > div > div > div.content-1SgpWY > div.chat-2ZfjoI > div.content-1jQy2l > main > form > div > div > div > div.scrollableContainer-15eg7h.webkit-QgSAqd > div > div.textArea-2CLwUE.textAreaSlate-9-y-k2.slateContainer-3x9zil > div.markup-eYLPri.slateTextArea-27tjG0.fontSize16Padding-XoMpjI > div';
  await page.waitForSelector(typeMessageFieldSelecor);
  for (let i = 1; i < iterations; i++) {
    await typeP(page, typeMessageFieldSelecor);
    await catchPokemon(page);
    await page.waitForTimeout(6900);
  }
}

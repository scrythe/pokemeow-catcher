import { Page } from 'puppeteer';

async function typeP(page: Page, typeMessageFieldSelecor: string) {
  await page.type(typeMessageFieldSelecor, ';p');
  await page.keyboard.press('Enter');
}

export async function writePokemonCatchMessage(page: Page): Promise<void> {
  const typeMessageFieldSelecor =
    '#app-mount > div.app-3xd6d0 > div > div.layers-OrUESM.layers-1YQhyW > div > div > div > div.content-1SgpWY > div.chat-2ZfjoI > div.content-1jQy2l > main > form > div > div > div > div.scrollableContainer-15eg7h.webkit-QgSAqd > div > div.textArea-2CLwUE.textAreaSlate-9-y-k2.slateContainer-3x9zil > div.markup-eYLPri.slateTextArea-27tjG0.fontSize16Padding-XoMpjI > div';
  await page.waitForSelector(typeMessageFieldSelecor);
  await typeP(page, typeMessageFieldSelecor);
  const messagesXPath = '//*[@aria-label="Messages in pokemon"]/li';
  const lastMessageXPath = `${messagesXPath}[last()]`;
  const pokemonButtonXPath = `${lastMessageXPath}/div/div/div/div/div/button[1]`;
  await page.waitForXPath(pokemonButtonXPath);
  const [pokemonButton] = await page.$x(pokemonButtonXPath);
  await pokemonButton.click();
}

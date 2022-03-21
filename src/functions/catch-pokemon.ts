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
  // #message-accessories-955471478009237504 > div > div:nth-child(1) > div > button:nth-child(2) > div > div
  // #message-accessories-955477187698524180 > div > div:nth-child(1) > div > button:nth-child(1) > div > div
  // document.querySelectorAll('[aria-label="Messages in pokemon"] > li');
  // const reverseAllMessages = [...allMessages].reverse();
  // reverseAllMessages[0].querySelector('div > div > div:nth-child(1) > div > button:nth-child(2) > div > div')
  // [...allMessages[allMessages.length-1].querySelector('div > div > div:nth-child(1) > div > button:nth-child(1)').classList].join('.')
  /* const message = await page.evaluate(() => {
    const allMessages = document.querySelectorAll(
      '[aria-label="Messages in pokemon"] > li'
    );
    const lastMessage = allMessages[allMessages.length - 1];
    return lastMessage;
  });
  const pokemonButton = page.evaluate(() => {
    const pokemonButton = message.querySelector(
      'div > div > div:nth-child(1) > div > button:nth-child(1)'
    );
    return pokemonButton;
  }); */
  // //*[@id="message-accessories-955538609962885251"]/div/div/div/button[2]
  // #message-accessories-955544526980784239 > div > div:nth-child(1) > div > button:nth-child(1)
  const messagesXPath = '//*[@aria-label="Messages in pokemon"]/li';
  const lastMessageXPath = `${messagesXPath}[last()]`;
  const pokemonButtonXPath = `${lastMessageXPath}/div/div/div/div/div/button[1]`;
  await page.waitForXPath(pokemonButtonXPath);
  const [pokemonButton] = await page.$x(pokemonButtonXPath);
  await pokemonButton.click();
}

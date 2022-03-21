import puppeteer, { Browser } from 'puppeteer';
import { getBrowserWSEndpoint } from './get-data.js';
import { NewBrowser, NewPage, BrowserPage } from '../interfaces/interfaces.js';

function checkIfDiscordUrl(link: string): boolean {
  const url = new URL(link);
  const discordHostname = 'discord.com';
  if (url.hostname != discordHostname) return false;
  return true;
}

async function openCurrentBrowser(
  wsChromeEndpointUrl: string
): Promise<puppeteer.Browser> {
  const browser = await puppeteer.connect({
    browserWSEndpoint: wsChromeEndpointUrl,
  });
  return browser;
}

async function openNewBrowser(): Promise<puppeteer.Browser> {
  const browser = await puppeteer.launch({ headless: false });
  return browser;
}

async function openBrowser({ newBrowser = true }: NewBrowser = {}) {
  if (newBrowser) return openNewBrowser();
  const browserWSEndpoint = await getBrowserWSEndpoint();
  if (!browserWSEndpoint) return;
  return openCurrentBrowser(browserWSEndpoint);
}

async function openCurrentPage(browser: Browser): Promise<puppeteer.Page> {
  const pages = await browser.pages();
  const [page] = pages.filter((currentPage): boolean => {
    const isDiscordUrl = checkIfDiscordUrl(currentPage.url());
    if (!isDiscordUrl) currentPage.close();
    return isDiscordUrl;
  });
  return page;
}

async function openNewPage(browser: Browser): Promise<puppeteer.Page> {
  const page = await browser.newPage();
  return page;
}

async function openPage({
  browser,
  newPage = true,
}: NewPage): Promise<puppeteer.Page> {
  if (newPage) return openNewPage(browser);
  return openCurrentPage(browser);
}

export async function openBrowserAndPage({
  newTab = true,
} = {}): Promise<BrowserPage> {
  const browser = await openBrowser({ newBrowser: newTab });
  if (!browser) throw Error('Browser not found');
  const page = await openPage({ browser, newPage: newTab });
  return { browser, page };
}

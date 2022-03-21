import puppeteer, { Browser } from 'puppeteer';
import { getBrowserWSEndpoint } from './get-data.js';
import { NewBrowser, NewPage } from './interfaces.js';

async function checkIfDiscordUrl(link: string): Promise<boolean> {
  const url = new URL(link);
  const discordHostname = 'discord.com';
  if (url.hostname != discordHostname) return false;
  return true;
}

async function openCurrentBrowser(wsChromeEndpointUrl: string) {
  const browser = await puppeteer.connect({
    browserWSEndpoint: wsChromeEndpointUrl,
  });
  return browser;
}

async function openNewBrowser() {
  const browser = await puppeteer.launch({ headless: false });
  return browser;
}

export async function openBrowser({ newBrowser = true }: NewBrowser = {}) {
  if (newBrowser) return openNewBrowser();
  const browserWSEndpoint = await getBrowserWSEndpoint();
  if (!browserWSEndpoint) return;
  return openCurrentBrowser(browserWSEndpoint);
}

async function openCurrentPage(browser: Browser): Promise<puppeteer.Page> {
  const pages = await browser.pages();
  const [page] = pages.filter(async (currentPage): Promise<boolean> => {
    const isDiscordUrl = await checkIfDiscordUrl(currentPage.url());
    if (!isDiscordUrl) currentPage.close();
    return isDiscordUrl;
  });
  return page;
}

async function openNewPage(browser: Browser): Promise<puppeteer.Page> {
  const page = await browser.newPage();
  return page;
}

export async function openPage({
  browser,
  newPage = true,
}: NewPage): Promise<puppeteer.Page> {
  if (newPage) return openNewPage(browser);
  return openCurrentPage(browser);
}

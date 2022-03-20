import puppeteer from 'puppeteer';
import { getBrowserWSEndpoint } from './get-data.js';
import { NewBrowser } from './interfaces.js';

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

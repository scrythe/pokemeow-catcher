import puppeteer from 'puppeteer';
import { newBrowser } from './interfaces.js';

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

export async function openBrowser({
  newBrowser,
  browserWSEndpoint,
}: newBrowser) {
  if (newBrowser) return openNewBrowser();
  if (!browserWSEndpoint) throw Error('Enter Browser WS Endpoint');
  return openCurrentBrowser(browserWSEndpoint);
}

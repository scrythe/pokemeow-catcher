import { Browser } from 'puppeteer';

export interface Data {
  email: string;
  password: string;
  browserWSEndpoint: string;
}

export interface User {
  email: string;
  password: string;
}

export interface NewBrowser {
  newBrowser?: boolean;
  browserWSEndpoint?: string;
}

export interface NewPage {
  browser: Browser;
  newPage?: boolean;
}

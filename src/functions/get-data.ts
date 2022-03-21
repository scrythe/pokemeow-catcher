import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFile } from 'fs/promises';
import { Data, User } from '../interfaces/interfaces.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function getData(): Promise<Data | undefined> {
  const dataPath = join(__dirname, '..', '..', 'src', 'private-data.json');
  const dataText = await readFile(dataPath).catch((err) => console.error(err));
  if (!dataText) return;
  const data: Data = JSON.parse(dataText.toString());
  return data;
}

export async function getLoginData(): Promise<User | undefined> {
  const data = await getData();
  if (!data) return;
  const { email, password }: User = data;
  return { email, password };
}

export async function getBrowserWSEndpoint(): Promise<string | undefined> {
  const data = await getData();
  if (!data) return;
  const { browserWSEndpoint } = data;
  return browserWSEndpoint;
}

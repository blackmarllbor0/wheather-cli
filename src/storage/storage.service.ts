import { join } from 'path';
import { homedir } from 'os';
import { promises } from 'fs';
import { storageData, StorageInterface } from './storage.interface';

type dataKeys = 'token' | 'city';

export const storageKeys = {
  TOKEN: 'token',
  CITY: 'city',
};

export class StorageService implements StorageInterface {
  public readonly filePath: string;

  constructor() {
    this.filePath = join(homedir(), 'weather-data.json');
  }

  public async saveKeyValue(key: dataKeys, value: string): Promise<void> {
    let data: storageData = { token: '', city: '' };

    if (await this.isExist(this.filePath)) {
      data = (await this.readFile(this.filePath)) as storageData;
    }

    data[key] = value;

    await promises.writeFile(this.filePath, JSON.stringify(data), 'utf-8');
  }

  public async getKeyValue(key: dataKeys): Promise<string> {
    if (await this.isExist(this.filePath)) {
      const data = (await this.readFile(this.filePath)) as storageData;
      return data[key];
    } else {
      return undefined;
    }
  }

  private async isExist(path: string): Promise<boolean> {
    try {
      await promises.stat(path);
      return true;
    } catch (error) {
      return false;
    }
  }

  private async readFile(path: string): Promise<object> {
    const file = await promises.readFile(path, 'utf-8');
    return JSON.parse(file) as object;
  }
}

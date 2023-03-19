import { join } from 'path';
import { homedir } from 'os';
import { promises, PathLike } from 'fs';
import { storageData, StorageInterface } from './storage.interface';

export class StorageService implements StorageInterface {
  public readonly filePath: string;
  public storageData: storageData;

  constructor() {
    this.filePath = join(homedir(), 'weather-data.json');
    this.storageData = {
      token: 'token',
      city: 'city',
    };
  }

  public async saveKeyValue(key, value: string): Promise<void> {
    let data: object;

    if (await this.isExist(this.filePath)) {
      data = await this.readFile(this.filePath);
    }

    data[key] = value;

    await promises.writeFile(this.filePath, JSON.stringify(data));
  }

  public async getKeyValue(key: string): Promise<string> {
    if (await this.isExist(this.filePath)) {
      const data = await this.readFile(this.filePath);
      return data[key];
    } else {
      return undefined;
    }
  }

  private async isExist(path: PathLike): Promise<boolean> {
    try {
      await promises.stat(path);
      return true;
    } catch (error) {
      return false;
    }
  }

  private async readFile(path: PathLike): Promise<object> {
    const file = await promises.readFile(path, 'utf-8');
    return JSON.parse(file) as object;
  }
}

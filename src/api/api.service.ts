import { StorageInterface } from '../storage/storage.interface';
import { LogInterface } from '../log/log.interface';
import axios from 'axios';
import { ApiInterface } from './api.interface';

export class ApiService implements ApiInterface {
  private token: string;

  constructor(
    private readonly storageService: StorageInterface,
    private readonly logger: LogInterface,
  ) {}

  public async getWeather(city: string): Promise<unknown> {
    const token = await this.storageService.getKeyValue(
      this.storageService.storageData.token,
    );

    if (!token) {
      this.logger.error('API key is not set, set it with command -d [API_KEY]');
    }

    const { data } = await axios.get(
      'https://api.weatherapi.com/v1/current.json',
      {
        params: {
          q: city,
          key: token,
          api: 'no',
          lang: 'ru',
        },
      },
    );

    return data;
  }
}

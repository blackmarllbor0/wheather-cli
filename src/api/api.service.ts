import { StorageInterface } from '../storage/storage.interface';
import { LogInterface } from '../log/log.interface';
import axios from 'axios';
import { ApiInterface } from './api.interface';
import { storageKeys } from '../storage/storage.service';

export interface responce {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: string;
    feelslike_c: string;
    humidity: string;
    condition: {
      text: string;
    };
    wind_kph: number;
  };
}
export class ApiService implements ApiInterface {
  constructor(
    private readonly storageService: StorageInterface,
    private readonly logger: LogInterface,
  ) {}

  public async getWeather(city: string): Promise<responce> {
    const token = await this.storageService.getKeyValue(storageKeys.TOKEN);

    if (!token) {
      this.logger.error('API key is not set, set it with command -t [API_KEY]');
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

    return data as responce;
  }
}

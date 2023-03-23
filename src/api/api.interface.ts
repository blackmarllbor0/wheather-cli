import { responce } from './api.service';

export interface ApiInterface {
  getWeather(city: string): Promise<responce>;
}

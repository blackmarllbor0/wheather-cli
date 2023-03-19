export interface ApiInterface {
  getWeather(city: string): Promise<unknown>;
}

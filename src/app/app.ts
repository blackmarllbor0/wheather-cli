#!/usr/bin/env node
import { LogInterface } from '../log/log.interface';
import { ApiInterface } from '../api/api.interface';
import { StorageInterface } from '../storage/storage.interface';
import { ArgsInterface } from '../args/args.interface';
import { storageKeys } from '../storage/storage.service';
import { responce } from '../api/api.service';

export class App {
  constructor(
    private readonly logger: LogInterface,
    private readonly apiService: ApiInterface,
    private readonly storageService: StorageInterface,
    private readonly argsService: ArgsInterface,
  ) {}

  public async run(): Promise<void> {
    const args = this.argsService.getArgs();

    if (args.h) {
      this.logger.help();
    } else if (args.c) {
      await this.saveCity(args.result);
    } else if (args.t) {
      await this.saveToken(args.result);
    } else {
      await this.getForecast();
    }
  }

  private async saveToken(token: string) {
    if (!token.length) {
      this.logger.error('not a token number');
      return;
    }

    try {
      await this.storageService.saveKeyValue(storageKeys.TOKEN, token);
      this.logger.log(`token saved -> token number: ${token}`);
    } catch (e) {
      this.logger.error(e.message);
    }
  }

  private async saveCity(city: string) {
    try {
      await this.storageService.saveKeyValue(storageKeys.CITY, city);
      this.logger.log(`city saved -> ${city}`);
    } catch (e) {
      this.logger.error(e.message);
    }
  }

  private async getForecast(): Promise<void> {
    try {
      const city = await this.storageService.getKeyValue(storageKeys.CITY);

      if (city) {
        const data = (await this.apiService.getWeather(city)) as responce;
        this.logger.weather(data);
      }
    } catch (error) {
      switch (error?.response?.status) {
        case 404:
          this.logger.error('incorrect city indicated');
          return;
        case 401:
          this.logger.error('incorrect token indicated');
          return;
        default:
          this.logger.error(error.message);
          return;
      }
    }
  }
}

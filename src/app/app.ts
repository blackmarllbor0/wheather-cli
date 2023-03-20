#!/usr/bin/env node
import { LogInterface } from '../log/log.interface';
import { getArgs } from '../helpers/args';
import * as process from 'process';
import { ApiInterface } from '../api/api.interface';
import { StorageInterface } from '../storage/storage.interface';

export class App {
  constructor(
    private readonly logger: LogInterface,
    private readonly apiService: ApiInterface,
    private readonly storageService: StorageInterface,
  ) {}

  public async run(): Promise<void> {
    const args = getArgs(process.argv);

    if (args.help) {
      this.logger.help();
    } else if (args.save) {
      await this.getForecast(args.save);
    } else if (args.token) {
      await this.saveToken(args.token as string);
    } else {
      await this.getForecast(
        await this.storageService.getKeyValue(
          this.storageService.storageData.city,
        ),
      );
    }
  }

  private async saveToken(token: string) {
    if (!token.length) {
      this.logger.error('not a token number');
      return;
    }

    try {
      await this.storageService.saveKeyValue(
        this.storageService.storageData.token,
        token,
      );
      this.logger.log(`token saved -> token number: ${token}`);
    } catch (e) {
      this.logger.error(e.message);
    }
  }

  private async getForecast(city: string | boolean): Promise<void> {
    try {
      if (typeof city === 'string') {
        const weather = await this.apiService.getWeather(city);
        this.logger.weather(weather);
        await this.storageService.saveKeyValue(
          this.storageService.storageData.city,
          city,
        );
      } else {
        this.logger.error(
          "you didn't specify a city, specify a city and try again",
        );
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

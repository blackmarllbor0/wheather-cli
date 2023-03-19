import { LogInterface } from '../log/log.interface';

export class App {
  constructor(private logger: LogInterface) {}

  public run(): void {
    this.logger.help();
    this.logger.log('log');
    this.logger.error('err');
  }
}

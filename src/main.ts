import { App } from './app/app';
import { Logger } from './log/log.service';

function main(): void {
  const log = new Logger();
  const app = new App(log);
  app.run();
}

main();

import { App } from './app/app';
import { Logger } from './log/log.service';
import { ApiService } from './api/api.service';
import { StorageService } from './storage/storage.service';
import { ArgsService } from './args/args.service';

async function main(): Promise<void> {
  const log = new Logger();
  const storage = new StorageService();
  const api = new ApiService(storage, log);
  const args = new ArgsService();
  const app = new App(log, api, storage, args);

  await app.run();
}

main();

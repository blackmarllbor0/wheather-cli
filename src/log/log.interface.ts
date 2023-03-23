import { responce } from '../api/api.service';

export interface LogInterface {
  log(msg: unknown): void;
  error(msg: string): void;
  help(): void;
  weather(data: responce): void;
}

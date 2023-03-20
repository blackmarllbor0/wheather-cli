export interface LogInterface {
  log(msg: string): void;
  error(msg: string): void;
  help(): void;
  weather(res: any): void;
}

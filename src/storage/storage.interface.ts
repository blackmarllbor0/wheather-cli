export interface StorageInterface {
  readonly filePath: string;
  saveKeyValue(key, value: string): Promise<void>;
  getKeyValue(key: string): Promise<string>;
}

export interface storageData {
  token: string;
  city: string;
}

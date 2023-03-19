export interface StorageInterface {
  readonly filePath: string;

  storageData: storageData;
  saveKeyValue(key, value: string): Promise<void>;
  getKeyValue(key: string): Promise<string>;
}

export interface storageData {
  token: string | 'token';
  city: string | 'city';
}

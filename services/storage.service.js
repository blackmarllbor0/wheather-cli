import { homedir } from "os";
import { join } from "path";
import { promises } from "fs";

const filePath = join(homedir(), "weather-data.json");

export const TOKEN_DICTIONARY = {
  token: "token",
  city: "city",
};

export const saveKeyValue = async (key, value) => {
  let data = {};

  if (await isExist(filePath)) {
    data = await readFile(filePath);
  }

  data[key] = value;

  await promises.writeFile(filePath, JSON.stringify(data));
};

export const getKeyValue = async (key) => {
  if (await isExist(filePath)) {
    let data = {};
    data = await readFile(filePath);
    return data[key];
  } else {
    return undefined;
  }
};

const isExist = async (path) => {
  try {
    await promises.stat(path);
    return true;
  } catch (error) {
    return false;
  }
};

const readFile = async (path) => {
  const file = await promises.readFile(path);
  return JSON.parse(file);
};

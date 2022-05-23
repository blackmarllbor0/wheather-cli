#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.service.js";
import {
  printHelp,
  printError,
  printSuccess,
  printWeather,
} from "./services/log.service.js";
import {
  getKeyValue,
  saveKeyValue,
  TOKEN_DICTIONARY,
} from "./services/storage.service.js";

const initCLI = async () => {
  const args = getArgs(process.argv);

  if (args.h) {
    // help output
    printHelp();
  } else if (args.s) {
    // save town
    getForccast(args.s);
  } else if (args.t) {
    // save token
    saveToken(args.t);
  } else {
    getForccast(await getKeyValue(TOKEN_DICTIONARY.city));
  }

  // output weather
};

const saveToken = async (token) => {
  if (!token.length) {
    return printError("Не перадан номер токена");
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess(`Токен сохранен -> номер токена: ${token}`);
  } catch (error) {
    printError(error.message);
  }
};

const getForccast = async (city) => {
  try {
    const weather = await getWeather(city);

    if (typeof city !== "boolean") {
      printWeather(weather);
      saveKeyValue(TOKEN_DICTIONARY.city, city);
    } else {
      printError("Вы не указали город, укажите город и попробуйте еще раз");
    }
  } catch (error) {
    switch (error?.responce?.status) {
      case 404:
        return printError("Неверно указан город");
      case 401:
        return printError("Неверно указан токен");
      default:
        return printError(error.message);
    }
  }
};

initCLI();

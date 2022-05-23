import axios from "axios";
import chalk from "chalk";
import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js";

export const getWeather = async (city) => {
  const token = await getKeyValue(TOKEN_DICTIONARY.token);

  if (!token) {
    throw new Error(
      chalk.white(
        `${chalk.bgRed("ERROR")}`,
        "Не задан ключ API, задайте его через команту -d [API_KEY]"
      )
    );
  }

  const { data } = await axios.get(
    "https://api.weatherapi.com/v1/current.json",
    {
      params: {
        q: city,
        key: token,
        api: "no",
        lang: "ru",
      },
    }
  );

  return data;  
};

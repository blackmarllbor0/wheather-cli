import chalk from "chalk";

export const printError = (error) => {
  console.log(chalk.white(`${chalk.bgRed("ERROR")} ${error}`));
};

export const printSuccess = (msg) => {
  console.log(chalk.white(`${chalk.bgGreen("SUCCESS")} ${msg}`));
};

export const printHelp = () => {
  console.log(
    chalk.white(
      `${chalk.bgBlue(chalk.white("<-HELP-> \n"))}`,
      "Без парамеров -> выводит погоду \n",
      "-s [CITY] -> для установки города \n",
      "-h -> для вывода помощи \n",
      "-t [API_KEY] -> для сохрвнения токена"
    )
  );
};

export const printWeather = (res, icon) => {
  console.log(
    chalk.white(
      `${chalk.bgYellow("WEATHER")}\n`,
      `Погода в городе ${res["location"]["name"]}:\n`,
      `${res["current"]["condition"]["text"]}\n`,
      `Температура - ${res["current"]["temp_c"]} градусов\n`,
      `Ощущается как - ${res["current"]["feelslike_c"]} градусов\n`,
      `Влажность - ${res["current"]["humidity"]}%\n`,
      `Скорость ветра - ${res["current"]["wind_kph"]} км/ч`
    )
  );
};

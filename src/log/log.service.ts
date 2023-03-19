import { white, bgGreen, bgBlue, bgRed } from 'colors';
import { LogInterface } from './log.interface';

export class Logger implements LogInterface {
  public log(msg: string): void {
    console.log(`${bgGreen(white('SUCCESS'))} ${white(msg)}`);
  }

  public error(msg: string): void {
    console.log(`${bgRed(white('ERROR'))} ${white(msg)}`);
  }

  public help(): void {
    console.log(
      bgBlue(white('<-HELP-> \n')),
      white(`
Без парамеров -> выводит погоду
-s [CITY] -> для установки города
-h -> для вывода помощи
-t [API_KEY] -> для сохрвнения токена
        `),
    );
  }

  public weather(): void {
    // console.log(
    //   chalk.white(
    //     `${chalk.bgYellow('WEATHER')}\n`,
    //     `Погода в городе ${res['location']['name']}:\n`,
    //     `${res['current']['condition']['text']}\n`,
    //     `Температура - ${res['current']['temp_c']} градусов\n`,
    //     `Ощущается как - ${res['current']['feelslike_c']} градусов\n`,
    //     `Влажность - ${res['current']['humidity']}%\n`,
    //     `Скорость ветра - ${res['current']['wind_kph']} км/ч`,
    //   ),
    // );
  }
}

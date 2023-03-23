import { white, bgGreen, bgBlue, bgRed, bgYellow } from 'colors';
import { LogInterface } from './log.interface';
import { responce } from '../api/api.service';

export class Logger implements LogInterface {
  public log(msg: unknown): void {
    console.log(`${bgGreen(white('SUCCESS'))} ${white(msg as string)}`);
  }

  public error(msg: string): void {
    console.log(`${bgRed(white('ERROR'))} ${white(msg)}`);
  }

  public help(): void {
    console.log(
      bgBlue(white('<-HELP-> \n')),
      white(`
Без парамеров -> выводит погоду
-h -> для вывода помощи
-c [CITY] -> для установки города
-t [API_KEY] -> для сохрвнения токена
        `),
    );
  }

  public weather({
    location: { name, country, localtime },
    current: {
      condition: { text },
      temp_c,
      feelslike_c,
      humidity,
      wind_kph,
    },
  }: responce): void {
    console.log(
      bgYellow('WEATHER\n'),
      white(`
Погода в городе ${country}/${name}: \n${text},
Время ${localtime},
Температура: ${temp_c} градусов,
Ощущается как: ${feelslike_c} градусов,
Влажность: ${humidity}%,
Скорость ветра: ${wind_kph} км/ч.
        `),
    );
  }
}

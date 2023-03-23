import * as process from 'process';
import { ArgsInterface, options } from './args.interface';

export class ArgsService implements ArgsInterface {
  public getArgs(): options {
    const option: options = {};

    process.argv.forEach((item) => {
      if (item.startsWith('-')) {
        const param = item.slice(1);
        if (param === 'h') {
          option.h = true;
        } else if (param === 'c') {
          option.result = process.argv[3];
          option.c = true;
        } else if (param === 't') {
          option.t = true;
          option.result = process.argv[3];
        }
      }
    });

    return option;
  }
}

export interface Args {
  h?: boolean | string; // help
  c?: boolean | string; // set city
  t?: boolean | string; // set token
}

export function getArgs(params: string[]): Args {
  const result: Args = {};
  const [exec, file, ...args] = params;

  args.forEach((item, index, array) => {
    if (item.charAt(0) === '-') {
      if (index === array.length - 1) {
        result[item.substring(1)] = true;
      } else if (array[index + 1].charAt(0) !== '-') {
        result[item.substring(1)] = array[index + 1];
      } else {
        result[item.substring(1)] = true;
      }
    }
  });

  return result;
}

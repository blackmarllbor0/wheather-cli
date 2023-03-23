export interface options {
  h?: boolean;
  t?: boolean;
  c?: boolean;
  result?: string;
}

export interface ArgsInterface {
  getArgs(): options;
}

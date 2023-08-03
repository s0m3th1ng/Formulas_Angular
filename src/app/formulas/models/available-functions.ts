export const AvailableFunctions: AvailableFunction[] = [
  {value: '+', operandsCount: 2, isFunction: false},
  {value: '-', operandsCount: 2, isFunction: false},
  {value: '*', operandsCount: 2, isFunction: false},
  {value: '/', operandsCount: 2, isFunction: false},
  {value: '%', operandsCount: 2, isFunction: false},
  {value: '^', operandsCount: 2, isFunction: false},
  {value: '=', operandsCount: 2, isFunction: false},
  {value: '!=', operandsCount: 2, isFunction: false},
  {value: '<>', operandsCount: 2, isFunction: false},
  {value: '<', operandsCount: 2, isFunction: false},
  {value: '<=', operandsCount: 2, isFunction: false},
  {value: '>', operandsCount: 2, isFunction: false},
  {value: '>=', operandsCount: 2, isFunction: false},
  {value: '&&', operandsCount: 2, isFunction: false},
  {value: '||', operandsCount: 2, isFunction: false},
  {value: 'NOT', operandsCount: 1, isFunction: true},
  {value: 'IF', operandsCount: 3, isFunction: true},
  {value: 'RANDOM', operandsCount: 0, isFunction: true},
  {value: 'MIN', operandsCount: null, isFunction: true},
  {value: 'MAX', operandsCount: null, isFunction: true},
  {value: 'ABS', operandsCount: 1, isFunction: true},
  {value: 'ROUND', operandsCount: 2, isFunction: true},
  {value: 'FLOOR', operandsCount: 1, isFunction: true},
  {value: 'CEILING', operandsCount: 1, isFunction: true},
  {value: 'LOG', operandsCount: 1, isFunction: true},
  {value: 'LOG10', operandsCount: 1, isFunction: true},
  {value: 'SQRT', operandsCount: 1, isFunction: true},
  {value: 'SINR', operandsCount: 1, isFunction: true},
  {value: 'COSR', operandsCount: 1, isFunction: true},
  {value: 'TANR', operandsCount: 1, isFunction: true},
  {value: 'COTR', operandsCount: 1, isFunction: true},
  {value: 'SECR', operandsCount: 1, isFunction: true},
  {value: 'CSCR', operandsCount: 1, isFunction: true},
  {value: 'ASINR', operandsCount: 1, isFunction: true},
  {value: 'ACOSR', operandsCount: 1, isFunction: true},
  {value: 'ATANR', operandsCount: 1, isFunction: true},
  {value: 'ACOTR', operandsCount: 1, isFunction: true},
  {value: 'ATAN2R', operandsCount: 2, isFunction: true},
  {value: 'SIN', operandsCount: 1, isFunction: true},
  {value: 'COS', operandsCount: 1, isFunction: true},
  {value: 'TAN', operandsCount: 1, isFunction: true},
  {value: 'COT', operandsCount: 1, isFunction: true},
  {value: 'SEC', operandsCount: 1, isFunction: true},
  {value: 'CSC', operandsCount: 1, isFunction: true},
  {value: 'ASIN', operandsCount: 1, isFunction: true},
  {value: 'ACOS', operandsCount: 1, isFunction: true},
  {value: 'ATAN', operandsCount: 1, isFunction: true},
  {value: 'ACOT', operandsCount: 1, isFunction: true},
  {value: 'ATAN2', operandsCount: 2, isFunction: true},
  {value: 'SINH', operandsCount: 1, isFunction: true},
  {value: 'COSH', operandsCount: 1, isFunction: true},
  {value: 'TANH', operandsCount: 1, isFunction: true},
  {value: 'COTH', operandsCount: 1, isFunction: true},
  {value: 'SECH', operandsCount: 1, isFunction: true},
  {value: 'CSCH', operandsCount: 1, isFunction: true},
  {value: 'ASINH', operandsCount: 1, isFunction: true},
  {value: 'ACOSH', operandsCount: 1, isFunction: true},
  {value: 'ATANH', operandsCount: 1, isFunction: true},
  {value: 'RAD', operandsCount: 1, isFunction: true},
  {value: 'DEG', operandsCount: 1, isFunction: true},
  {value: 'FACT', operandsCount: 1, isFunction: true},
];

export const AvailableConstants: string[] = [
  'e', 'PI', 'TRUE', 'FALSE', 'NULL'
]

export class AvailableFunction {
  constructor(value: string, operandsCount: number, isFunction: boolean) {
    this.value = value;
    this.operandsCount = operandsCount;
    this.isFunction = isFunction;
  }

  value: string;
  operandsCount: number | null;
  isFunction: boolean;
}

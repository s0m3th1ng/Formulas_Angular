import { ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { AvailableConstants, AvailableFunction, AvailableFunctions } from "../models/available-functions";

const operators = AvailableFunctions.filter(x => !x.isFunction);
const operatorsValues = operators.map(x => x.value);

const functions = AvailableFunctions.filter(x => x.isFunction)
const functionsValues = functions.map(x => x.value);

const numberRegex = /(^0(.\d+)?$)|(^[1-9]\d*(.\d+)?$)/;

export const formulaValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (!control || !control.value) {
    return {formulaRequired: true};
  }

  var index = checkInvalidFormula(control.value);
  if (index > 0) {
    return {invalidFormula: true, index: index}
  }

  return null;
};

function checkInvalidFormula(formula: string): number {
  var index = checkWrongBrackets(formula);
  if (index > 0) {
    return index;
  }

  formula = formula.replace(/ /g, '');
  index = checkInvalidOperands(formula); //recursive formulas validation
  if (index > 0) {
    return index;
  }

  return 0;
}

function checkWrongBrackets(formula: string): number {
  var count = 0; //check empty brackets

  for (var i = 0, sym = ''; sym = formula.charAt(i); i++) {
    if (sym == '(') {
      count++;
    } else if (sym == ')') {
      count--;
    }
    if (count < 0) {
      return i + 1;
    }
  }
  if (count > 0) {
    return formula.length;
  }
  return 0;
}

function checkInvalidOperands(formula: string, initIndex: number = 0): number {
  const checkFormula = formula
    .replace('(', '')
    .replace(')', '');
  if (numberRegex.test(checkFormula) || AvailableConstants.includes(checkFormula)) {
    console.log(numberRegex.test(checkFormula));
    console.log(AvailableConstants.includes(checkFormula))
    return 0; //valid
  }

  var index = 0;
  var functionOrOperand = '';
  var prevSym = '';
  var justFoundOperator = true;

  while (index < formula.length) {
    let sym = formula.charAt(index);
    functionOrOperand += sym;
    index++;

    if (index == formula.length || sym == '(' || sym == ')' || operatorsValues.map(x => x[0]).includes(sym)) {
      if ((sym == '(' && prevSym == '(') || (sym == ')' && prevSym == ')')) {
        continue;
      }
      if (sym == '(' && prevSym != '(') {
        functionOrOperand = functionOrOperand
          .replace('(', '')
          .replace(')', '');
        if (functionOrOperand == '' || functionsValues.includes(functionOrOperand)) {
          if (functionsValues.includes(functionOrOperand)) {
            if (!justFoundOperator) {
              return index + initIndex;
            }
            const argsString = getArgs(formula, index);
            const argsArray = getArgsArray(argsString);
            const func = functions.find(x => x.value == functionOrOperand);
            if (wrongArgsCount(func, argsArray)) {
              return index + initIndex;
            } else {
              for (var arg of argsArray) {
                let i = checkInvalidOperands(arg, index);
                if (i > 0) {
                  return i + initIndex;
                }
              }
              index += argsString.length + 1;
              prevSym = ')';
              justFoundOperator = false;
            }
          } else {
            justFoundOperator = true;
          }
          functionOrOperand = '';
          continue;
        } else {
          return index + initIndex;
        }
      }
      if (operatorsValues.map(x => x[0]).includes(sym) || sym == ')') {
        functionOrOperand = functionOrOperand
          .slice(0, -1)
          .replace('(', '')
          .replace(')', '');
        if (justFoundOperator && functionOrOperand == '') {
          return index + initIndex;
        }
        if (functionOrOperand == '' || numberRegex.test(functionOrOperand) || AvailableConstants.includes(functionOrOperand)) {
          justFoundOperator = sym != ')';
          if (justFoundOperator && index < formula.length) {
            var op = sym + formula[index];
            if (operatorsValues.includes(op) || operatorsValues.includes(sym)) {
              if (operatorsValues.includes(op)) {
                index++;
              }
            } else {
              return index + initIndex;
            }
          }
          if (justFoundOperator && index == formula.length) {
            return index + initIndex;
          }
          if (functionOrOperand != '') {
            functionOrOperand = '';
          }
        } else {
          return index + initIndex - 1;
        }
      }
      if (index == formula.length) {
        functionOrOperand = functionOrOperand
          .replace('(', '')
          .replace(')', '');
        if (justFoundOperator && functionOrOperand == '') {
          return index + initIndex;
        }
        if (functionOrOperand != '') {
          if (!(numberRegex.test(functionOrOperand) || AvailableConstants.includes(functionOrOperand))) {
            return index + initIndex;
          }
        }
      }
    }
    prevSym = sym;
  }
  return 0;
}

function getArgs(formula: string, index: number): string {
  var args = '';
  var count = 1;

  while (count > 0) {
    if (formula[index] == '(') {
      count++;
    }
    if (formula[index] == ')') {
      count--;
    }
    if (count != 0) {
      args += formula[index];
      index++;
    }
  }
  return args;
}

function getArgsArray(argsString: string): string[] {
  var argsArray = [];
  var count = 0;
  var arg = '';

  for (var sym of argsString) {
    if (sym == '(') {
      count++;
    }
    if (sym == ')') {
      count--;
    }
    if (sym == ',' && count == 0) {
      argsArray.push(arg);
      arg = '';
    } else {
      arg += sym;
    }
  }
  argsArray.push(arg);

  return argsArray;
}

function wrongArgsCount(func: AvailableFunction | undefined, args: string[]): boolean {
  if (typeof func == 'undefined') {
    return true;
  }

  if (func.operandsCount == null && args.length > 1) {
    return false;
  }
  if (func.operandsCount == 0 && args.length == 1 && args[0] == '') {
    return false;
  }
  if (func.operandsCount == args.length && !args.some(x => x == '')) {
    return false;
  }

  return true;
}

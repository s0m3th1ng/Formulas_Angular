import { Component, Input, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { formulaValidator } from "./validators/formulas.validator";
import { AvailableConstants, AvailableFunction, AvailableFunctions } from "./models/available-functions";

@Component({
  selector: 'app-formulas',
  templateUrl: './formulas.component.html',
  styleUrls: ['./formulas.component.scss']
})
export class FormulasComponent implements OnInit{
  constructor() {

  }

  ngOnInit() {
    if (!this.formControl) {
      this.formControl = new FormControl(null);
    }
    this.formControl.setValidators([Validators.required, formulaValidator]);
    this.formControl.valueChanges.subscribe(value => {
      console.log(value);
    });
  }

  @Input() formControl!: FormControl;
  @Input() selectorLength: number = 10
  selectorVisible: boolean = false;
  predictionValue: string = '';


  execAutocomplete(e: MouseEvent) {
    var formula = this.formControl.value.replace(/ /g, '');
    var i = formula.length - 1;
    while (i >= i && /[),]/.test(formula.charAt(i))) {
      i--;
    }
    i++;
    var brackets = formula.substring(i);
    var target = <HTMLInputElement>e.target;
    this.formControl.patchValue(
      `${formula.substring(0, formula.length - this.predictionValue.length - brackets.length)}${target?.value}${brackets}`);
    this.predictionValue = '';
  }

  checkBracket(e: KeyboardEvent) {
    if (e.key == '(') {
      var index = (<HTMLInputElement>e.target).selectionStart;
      var formula = this.formControl.value;
      this.formControl.patchValue(`${formula.slice(0, index)})${formula.slice(index)}`);
    }
  }

  unfocusInput() {
    setTimeout(() => {
      this.selectorVisible = false
    }, 250);
  }

  get predictions(): string[] {
    var f = this.formControl.value.replace(/ /g, '');
    if (!f) {
      return [];
    }

    var i = f.length - 1;
    var operators = AvailableFunctions.filter(x => !x.isFunction).map(x => x.value[x.value.length - 1]);
    var predict = '';
    while (i >= 0 && !operators.concat(['(']).includes(f.charAt(i))) {
      if (predict.length && f.charAt(i) == ',') {
        break;
      }
      if (![',', ')'].includes(f.charAt(i))) {
        predict += f.charAt(i);
      }
      i--;
    }
    i++;
    this.predictionValue = f.substring(i).replace(/[),]/g, '');
    if (!this.predictionValue) {
      return [];
    }
    return AvailableFunctions
      .filter(x => x.value.toUpperCase().startsWith(this.predictionValue.toUpperCase()))
      .map(x => this.getFormattedFunction(x))
      .concat(
        AvailableConstants.filter(x => x.toUpperCase().startsWith(this.predictionValue.toUpperCase()) && x != this.predictionValue)
      );
  }

  getFormattedFunction(f: AvailableFunction): string {
    var count = f.operandsCount == null ? 2 : f.operandsCount;
    var commas = count < 2 ? '' : ','.repeat((f.operandsCount || 2) - 1);
    return `${f.value}(${commas})`;
  }
}

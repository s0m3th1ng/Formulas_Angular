import { Component } from '@angular/core';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Formulas_Angular';
  fc = new FormControl('123');
  error: boolean = false;
  formula: string = "";

  onSubmit() {
    this.fc.patchValue(this.fc.value?.replace(/ /g, ''));
    if (!this.fc.value) {
      this.error = true;
      this.formula = `Formula required.`;
    }
    if (this.fc.valid) {
      this.error = false;
      this.formula = this.fc.value;
    } else {
      this.error = true;
      if (this.fc.value) {
        this.formula = `Error at position ${this.fc.errors?.['index']}`;
      }
    }
  }
}

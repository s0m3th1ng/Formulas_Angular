import { NgModule } from "@angular/core";
import { FormulasComponent } from "./formulas.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  declarations: [FormulasComponent],
  exports: [
    FormulasComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatAutocompleteModule,
    MatInputModule
  ]
})
export class FormulasModule {}

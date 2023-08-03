# FormulasAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.11.

## Formulas module

Formulas module and everything associated with it is located at `src/app/formulas/`

### Component inputs

`[formControl]` - FormControl associated with component's input

`[selectorLength]` - max size of component's hints selector

### Component styles

`.formula-input-width` - class for setting input's width (affects selector's width)

`.formula-input-height` - class for setting input's (and selector options') height

`.formula-input-container` - class for stylization component's root div

`.formula-input` - class for stylization component's input

`.formula-select` - class for stylization component's selector

## Usage example

(Note: usage example is also provided in `app.component.html`)

```angular2html
<app-formulas
  [formControl]="sample_form_control"
  [selectorLength]="sample_hints_count"
></app-formulas>
```

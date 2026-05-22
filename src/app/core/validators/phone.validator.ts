import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    if (!value) {
      return null;
    }

    const phonePattern = /^\+?[\d\s\-().]{7,20}(?:\s*(?:x|ext\.?)\s*\d{1,6})?$/i;
    return phonePattern.test(value) ? null : { invalidPhone: true };
  };
}

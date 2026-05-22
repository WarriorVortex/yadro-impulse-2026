import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export interface FloatValidatorParams {
  min?: number;
  max?: number;
}

export function floatValidator(
  params: FloatValidatorParams = {},
  errorKey = 'floatError',
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    if (!value) {
      return null;
    }

    const num = parseFloat(value);
    if (isNaN(num)) {
      return { [errorKey]: `Must be a number` };
    }

    const { min = Number.MIN_VALUE, max = Number.MAX_VALUE } = params;

    if (num < min || num > max) {
      return { [errorKey]: `Must be between ${min} and ${max}` };
    }

    return null;
  };
}

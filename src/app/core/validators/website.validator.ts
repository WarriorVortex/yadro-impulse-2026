import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function websiteValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    if (!value) {
      return null;
    }

    const websitePattern =
      /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-./?%&=]*)?$/i;
    return websitePattern.test(value) ? null : { invalidWebsite: true };
  };
}

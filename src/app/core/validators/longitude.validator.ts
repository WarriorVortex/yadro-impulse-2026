import { ValidatorFn } from '@angular/forms';
import { floatValidator } from './float.validator';

export function longitudeValidator(): ValidatorFn {
  return floatValidator({ min: -180, max: 180 }, 'invalidLongitude');
}

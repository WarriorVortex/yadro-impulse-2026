import { floatValidator } from './float.validator';
import { ValidatorFn } from '@angular/forms';

export function latitudeValidator(): ValidatorFn {
  return floatValidator({ min: -90, max: 90 }, 'invalidLatitude');
}

import { floatValidator } from '../float';
import { ValidatorFn } from '@angular/forms';

export function latitudeValidator(): ValidatorFn {
  return floatValidator({ min: -90, max: 90 }, 'invalidLatitude');
}

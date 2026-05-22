import { FormControl } from '@angular/forms';
import { longitudeValidator } from './longitude.validator';

describe('longitudeValidator', () => {
  it('should return null for valid longitude', () => {
    const validator = longitudeValidator();
    expect(validator(new FormControl('-180'))).toBeNull();
    expect(validator(new FormControl('0'))).toBeNull();
    expect(validator(new FormControl('180'))).toBeNull();
    expect(validator(new FormControl('73.4'))).toBeNull();
  });

  it('should return error for longitude below -180', () => {
    const validator = longitudeValidator();
    const result = validator(new FormControl('-181'));
    expect(result).toEqual({
      invalidLongitude: 'Must be between -180 and 180',
    });
  });

  it('should return error for longitude above 180', () => {
    const validator = longitudeValidator();
    const result = validator(new FormControl('181'));
    expect(result).toEqual({
      invalidLongitude: 'Must be between -180 and 180',
    });
  });

  it('should return error for non-numeric value', () => {
    const validator = longitudeValidator();
    const result = validator(new FormControl('abc'));
    expect(result).toEqual({ invalidLongitude: 'Must be a number' });
  });

  it('should return null for empty value', () => {
    const validator = longitudeValidator();
    expect(validator(new FormControl(''))).toBeNull();
  });
});

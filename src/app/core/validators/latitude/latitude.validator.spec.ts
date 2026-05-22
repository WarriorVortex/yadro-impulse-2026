import { FormControl } from '@angular/forms';
import { latitudeValidator } from './latitude.validator';

describe('latitudeValidator', () => {
  it('should return null for valid latitude', () => {
    const validator = latitudeValidator();
    expect(validator(new FormControl('-90'))).toBeNull();
    expect(validator(new FormControl('0'))).toBeNull();
    expect(validator(new FormControl('90'))).toBeNull();
    expect(validator(new FormControl('45.5'))).toBeNull();
  });

  it('should return error for latitude below -90', () => {
    const validator = latitudeValidator();
    const result = validator(new FormControl('-91'));
    expect(result).toEqual({ invalidLatitude: 'Must be between -90 and 90' });
  });

  it('should return error for latitude above 90', () => {
    const validator = latitudeValidator();
    const result = validator(new FormControl('91'));
    expect(result).toEqual({ invalidLatitude: 'Must be between -90 and 90' });
  });

  it('should return error for non-numeric value', () => {
    const validator = latitudeValidator();
    const result = validator(new FormControl('abc'));
    expect(result).toEqual({ invalidLatitude: 'Must be a number' });
  });

  it('should return null for empty value', () => {
    const validator = latitudeValidator();
    expect(validator(new FormControl(''))).toBeNull();
  });
});

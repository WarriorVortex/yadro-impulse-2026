import { FormControl } from '@angular/forms';
import { phoneValidator } from './phone.validator';

describe('phoneValidator', () => {
  it('should return null for empty value', () => {
    const validator = phoneValidator();
    expect(validator(new FormControl(''))).toBeNull();
  });

  it('should return null for a valid phone number', () => {
    const validator = phoneValidator();
    expect(validator(new FormControl('+1 (555) 000-0000'))).toBeNull();
    expect(validator(new FormControl('493-170-9623 x156'))).toBeNull();
    expect(validator(new FormControl('1234567890'))).toBeNull();
    expect(validator(new FormControl('+7 999 123 45 67'))).toBeNull();
  });

  it('should return error for an invalid phone number', () => {
    const validator = phoneValidator();
    expect(validator(new FormControl('abc'))).toEqual({ invalidPhone: true });
    expect(validator(new FormControl('12'))).toEqual({ invalidPhone: true });
  });
});

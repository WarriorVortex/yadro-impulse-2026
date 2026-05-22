import { FormControl } from '@angular/forms';
import { floatValidator } from './float.validator';

describe('floatValidator', () => {
  it('should return null for empty value', () => {
    const control = new FormControl('');
    const validator = floatValidator();
    expect(validator(control)).toBeNull();
  });

  it('should return error for non-numeric value', () => {
    const control = new FormControl('abc');
    const validator = floatValidator();
    const result = validator(control);
    expect(result).toEqual({ floatError: 'Must be a number' });
  });

  it('should return null for a valid number', () => {
    const control = new FormControl('42');
    const validator = floatValidator();
    expect(validator(control)).toBeNull();
  });

  it('should return error for number below min', () => {
    const control = new FormControl('5');
    const validator = floatValidator({ min: 10 });
    const result = validator(control);
    expect(result).toEqual({
      floatError: 'Must be between 10 and 1.7976931348623157e+308',
    });
  });

  it('should return error for number above max', () => {
    const control = new FormControl('20');
    const validator = floatValidator({ max: 10 });
    const result = validator(control);
    expect(result).toEqual({ floatError: 'Must be between 5e-324 and 10' });
  });

  it('should return null for number within range', () => {
    const control = new FormControl('15');
    const validator = floatValidator({ min: 10, max: 20 });
    expect(validator(control)).toBeNull();
  });

  it('should use custom error key', () => {
    const control = new FormControl('abc');
    const validator = floatValidator({}, 'customKey');
    const result = validator(control);
    expect(result).toEqual({ customKey: 'Must be a number' });
  });

  it('should handle decimal numbers', () => {
    const control = new FormControl('3.14');
    const validator = floatValidator();
    expect(validator(control)).toBeNull();
  });

  it('should handle negative numbers', () => {
    const control = new FormControl('-5');
    const validator = floatValidator({ min: -10, max: 0 });
    expect(validator(control)).toBeNull();
  });
});

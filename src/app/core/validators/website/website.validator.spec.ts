import { FormControl } from '@angular/forms';
import { websiteValidator } from './website.validator';

describe('websiteValidator', () => {
  it('should return null for empty value', () => {
    const validator = websiteValidator();
    expect(validator(new FormControl(''))).toBeNull();
  });

  it('should return null for valid website with protocol', () => {
    const validator = websiteValidator();
    expect(validator(new FormControl('https://example.com'))).toBeNull();
    expect(
      validator(new FormControl('http://sub.domain.co.uk/path?q=1')),
    ).toBeNull();
  });

  it('should return null for valid website without protocol', () => {
    const validator = websiteValidator();
    expect(validator(new FormControl('example.com'))).toBeNull();
    expect(validator(new FormControl('my-site.org/path/to/page'))).toBeNull();
  });

  it('should return error for invalid website', () => {
    const validator = websiteValidator();
    expect(validator(new FormControl('not a url'))).toEqual({
      invalidWebsite: true,
    });
    expect(validator(new FormControl('http://'))).toEqual({
      invalidWebsite: true,
    });
    expect(validator(new FormControl('just-text'))).toEqual({
      invalidWebsite: true,
    });
  });
});

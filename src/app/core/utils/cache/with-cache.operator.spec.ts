import { BehaviorSubject, of, throwError } from 'rxjs';
import { withCache } from './with-cache.operator';

describe('withCache', () => {
  it('should return cached value if cache is not empty', () => {
    const cache$ = new BehaviorSubject<string | null>('cached-value');
    const source$ = of('new-value');

    source$.pipe(withCache(cache$)).subscribe((value) => {
      expect(value).toBe('cached-value');
    });
  });

  it('should call source and cache result when cache is empty', () => {
    const cache$ = new BehaviorSubject<string | null>(null);
    const source$ = of('fresh-data');

    source$.pipe(withCache(cache$)).subscribe((value) => {
      expect(value).toBe('fresh-data');
      expect(cache$.value).toBe('fresh-data');
    });
  });

  it('should set cache to null and rethrow error when source fails and cache is empty', () => {
    const cache$ = new BehaviorSubject<string | null>(null);
    const source$ = throwError(() => new Error('fail'));

    source$.pipe(withCache(cache$)).subscribe({
      error: (err) => {
        expect(err.message).toBe('fail');
        expect(cache$.value).toBeNull();
      },
    });
  });
});

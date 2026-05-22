import { BehaviorSubject, of, throwError } from 'rxjs';
import { invalidateCache } from './invalidate-cache.operator';

describe('invalidateCache', () => {
  it('should set cache to null on next', () => {
    const cache$ = new BehaviorSubject<string | null>('cached');
    const source$ = of('data').pipe(invalidateCache(cache$));

    source$.subscribe({
      next: (value) => {
        expect(value).toBe('data');
        expect(cache$.value).toBeNull();
      },
    });
  });

  it('should set cache to null on error', () => {
    const cache$ = new BehaviorSubject<string | null>('cached');
    const source$ = throwError(() => new Error('fail')).pipe(
      invalidateCache(cache$),
    );

    source$.subscribe({
      error: (err) => {
        expect(err.message).toBe('fail');
        expect(cache$.value).toBeNull();
      },
    });
  });
});

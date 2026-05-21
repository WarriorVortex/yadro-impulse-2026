import {BehaviorSubject, MonoTypeOperatorFunction, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

export function invalidateCache<T, R>(
  cache$: BehaviorSubject<T | null>
): MonoTypeOperatorFunction<R> {
  return (source: Observable<R>) =>
    source.pipe(
      tap({
        next: () => cache$.next(null),
        error: () => cache$.next(null),
      })
    );
}

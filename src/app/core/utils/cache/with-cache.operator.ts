import {
  BehaviorSubject,
  MonoTypeOperatorFunction,
  Observable,
  throwError,
} from 'rxjs';
import { catchError, filter, first, tap } from 'rxjs/operators';

export function withCache<T>(
  cache$: BehaviorSubject<T | null>,
): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) => {
    if (cache$.value !== null) {
      return cache$.pipe(
        filter((v): v is T => v !== null),
        first(),
      );
    }
    return source.pipe(
      tap((data) => cache$.next(data)),
      catchError((error) => {
        cache$.next(null);
        return throwError(() => error);
      }),
    );
  };
}

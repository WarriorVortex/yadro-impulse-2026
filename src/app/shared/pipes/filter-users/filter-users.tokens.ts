import { InjectionToken } from '@angular/core';
import { User } from '@app/models';

export type UserFilterPredicate = (user: User, term: string) => boolean;

export const USER_FILTER_PREDICATE = new InjectionToken<UserFilterPredicate>(
  'USER_FILTER_PREDICATE',
  {
    factory: () => (user: User, term: string) =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term),
  }
);

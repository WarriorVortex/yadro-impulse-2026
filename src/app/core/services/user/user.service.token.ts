import { InjectionToken } from '@angular/core';
import { User } from '@app/models';
import {FilterUsersParams, UserFilterPredicate} from '@app/services';

export const USER_FILTER_PREDICATE = new InjectionToken<UserFilterPredicate>(
  'USER_FILTER_PREDICATE',
  {
    factory: () => ({ name, email }: User, { search }: FilterUsersParams) => {
      let trimmedSearch = search.trim();

      if (!trimmedSearch) {
        return true;
      }

      return name.toLowerCase().includes(trimmedSearch) ||
        email.toLowerCase().includes(trimmedSearch);
    }
  }
);

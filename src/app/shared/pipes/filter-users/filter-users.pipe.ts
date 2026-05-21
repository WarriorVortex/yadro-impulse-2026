import {inject, Pipe, PipeTransform} from '@angular/core';
import { User } from '@app/models';
import {USER_FILTER_PREDICATE} from './filter-users.tokens';

@Pipe({
  name: 'filterUsers',
  standalone: true,
  pure: true
})
export class FilterUsersPipe implements PipeTransform {
  private filterPredicate = inject(USER_FILTER_PREDICATE);

  transform(users: User[] | null, searchTerm: string): User[] {
    if (!users) {
      return [];
    }
    if (!searchTerm?.trim()) {
      return users;
    }

    const term = searchTerm.toLowerCase().trim();

    return users.filter((user) => this.filterPredicate(user, term));
  }
}

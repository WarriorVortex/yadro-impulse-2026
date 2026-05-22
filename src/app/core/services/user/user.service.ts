import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  asyncScheduler,
  BehaviorSubject,
  Observable,
  observeOn,
  of,
} from 'rxjs';
import { User } from '@app/models';
import { invalidateCache, withCache } from '@app/utils';
import { FilterUsersParams } from './user.service.types';
import { USER_FILTER_PREDICATE } from './user.service.token';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  private cachedUsers$ = new BehaviorSubject<User[] | null>(null);

  private http = inject(HttpClient);
  private filterPredicate = inject(USER_FILTER_PREDICATE);

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.apiUrl)
      .pipe(withCache(this.cachedUsers$));
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(user: Partial<User>): Observable<User> {
    return this.http
      .post<User>(this.apiUrl, user)
      .pipe(invalidateCache(this.cachedUsers$));
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http
      .put<User>(`${this.apiUrl}/${id}`, user)
      .pipe(invalidateCache(this.cachedUsers$));
  }

  deleteUser(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(invalidateCache(this.cachedUsers$));
  }

  filterUsers(users: User[], params: FilterUsersParams): Observable<User[]> {
    const filtered = users.filter((user: User) =>
      this.filterPredicate(user, params),
    );

    return of(filtered).pipe(observeOn(asyncScheduler));
  }
}

import {ChangeDetectionStrategy, Component, computed, DestroyRef, effect, inject, Signal, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {combineLatest, debounceTime, delay, Observable, of, switchMap, tap, throwError} from 'rxjs';
import {NzTableComponent, NzThMeasureDirective} from 'ng-zorro-antd/table';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzInputDirective, NzInputGroupComponent} from 'ng-zorro-antd/input';
import {NzSpaceComponent} from 'ng-zorro-antd/space';
import {UserService} from '@app/services';
import {User} from '@app/models';
import {getUserDetailRoute, getUserEditRoute, USER_NEW_ROUTE} from '@app/routes';
import {takeUntilDestroyed, toObservable, toSignal} from '@angular/core/rxjs-interop';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {catchError, filter} from 'rxjs/operators';
import {NzEmptyComponent} from 'ng-zorro-antd/empty';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzAvatarComponent} from 'ng-zorro-antd/avatar';
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';
import {PaginationComponent} from '@app/components';

@Component({
  selector: 'app-user-list-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NzTableComponent,
    NzButtonComponent,
    NzInputDirective,
    NzSpaceComponent,
    NzEmptyComponent,
    NzCardComponent,
    NzPageHeaderComponent,
    NzIconDirective,
    NzInputGroupComponent,
    NzAvatarComponent,
    NzTooltipDirective,
    NzThMeasureDirective,
    PaginationComponent,
  ],
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListPageComponent {
  protected pageSize = signal(5);
  protected currentPage = signal(1);

  protected search = signal('');

  protected isLoading = signal(true);
  protected users = signal<User[] | null>(null);
  protected filteredUsers: Signal<User[] | null>
  protected paginatedUsers: Signal<User[] | null>;

  protected readonly newUserRoute = USER_NEW_ROUTE;
  protected readonly detailRouteFn = getUserDetailRoute;
  protected readonly editRouteFn = getUserEditRoute;

  private userService = inject(UserService);
  private notification = inject(NzNotificationService);
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.loadUsers().subscribe();

    this.filteredUsers = this.computeFilteredUsers();
    this.paginatedUsers = this.computePaginatedUsers();

    effect(() => {
      const total = this.filteredUsers()?.length ?? 0;
      const maxPage = Math.ceil(total / this.pageSize());

      if (this.currentPage() > maxPage && maxPage > 0) {
        this.currentPage.set(maxPage);
      } else if (maxPage === 0) {
        this.currentPage.set(1);
      }
    });

    effect(() => {
      this.search();
      this.pageSize();
      this.currentPage.set(1);
    });
  }

  protected deleteUser(id: number): void {
    this.userService.deleteUser(id).pipe(
      tap(() => {
        this.notification.success('Success', 'User was deleted');
      }),
      catchError((err) => {
        this.notification.error('Error', 'Cannot delete user');

        return throwError(() => err);
      }),
      switchMap(this.loadUsers),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe();
  }

  private loadUsers(): Observable<User[] | null> {
    return this.userService.getUsers().pipe(
      tap(this.users.set),
      catchError((err) => {
        this.notification.error('Error', 'Cannot load users');
        this.isLoading.set(false);

        return throwError(() => err);
      }),
      takeUntilDestroyed(this.destroyRef),
    );
  }

  private computeFilteredUsers(): Signal<User[] | null> {
    const filteredUsers$ = combineLatest([
      toObservable(this.users),
      toObservable(this.search)
    ]).pipe(
      debounceTime(200),
      tap(() => this.isLoading.set(true)),
      switchMap(([users, search]) => {
        if (users === null) {
          return of(null);
        }

        return this.userService.filterUsers(users, { search });
      }),
      filter(users => users !== null),
      delay(100),
      catchError(() => {
        this.notification.error('Error', 'Users filtering failed');

        return of(this.users())
      }),
      tap({
        next: () => this.isLoading.set(false),
        error: () => this.isLoading.set(false)
      }),
    );

    return toSignal(filteredUsers$, { initialValue: null });
  }

  private computePaginatedUsers(): Signal<User[] | null> {
    return computed(() => {
      const users = this.filteredUsers();

      if (users === null) {
        return null;
      }

      const start = (this.currentPage() - 1) * this.pageSize();

      return users.slice(start, start + this.pageSize());
    });
  }
}

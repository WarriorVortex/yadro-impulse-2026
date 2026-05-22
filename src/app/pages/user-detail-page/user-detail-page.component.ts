import {ChangeDetectionStrategy, Component, DestroyRef, effect, inject, signal, Signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {catchError, delay, map, of, tap} from 'rxjs';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsModule} from 'ng-zorro-antd/descriptions';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzSpaceComponent, NzSpaceItemDirective} from 'ng-zorro-antd/space';
import {NzSkeletonComponent} from 'ng-zorro-antd/skeleton';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {NzEmptyComponent} from 'ng-zorro-antd/empty';
import {UserService} from '@app/services';
import {User} from '@app/models';
import {getUserEditRoute, USER_ID_PARAM, USER_LIST_ROUTE} from '@app/routes';
import {NzAvatarComponent} from 'ng-zorro-antd/avatar';

@Component({
  selector: 'app-user-detail-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzCardComponent,
    NzDescriptionsModule,
    NzButtonComponent,
    NzPageHeaderComponent,
    NzIconDirective,
    NzSpaceComponent,
    NzSpaceItemDirective,
    NzSkeletonComponent,
    NzEmptyComponent,
    NzAvatarComponent
  ],
  templateUrl: './user-detail-page.component.html',
  styleUrls: ['./user-detail-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailPageComponent {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private notification = inject(NzNotificationService);
  private destroyRef = inject(DestroyRef);

  private readonly userId: Signal<number | null>;

  protected user = signal<User | null>(null);
  protected isLoading = signal(false);
  protected isError = signal(false);

  protected readonly listRoute = USER_LIST_ROUTE;
  protected readonly editRouteFn = getUserEditRoute;

  constructor() {
    this.userId = this.computeUserId();

    effect(() => {
      const currentId = this.userId();

      if (currentId !== null) {
        this.fetchUser(currentId);
      }
    });
  }

  private computeUserId(): Signal<number | null> {
    const userId$ = this.route.paramMap.pipe(
      map(params => {
        const id = Number(params.get(USER_ID_PARAM));
        return isNaN(id) ? null : id;
      })
    );

    return toSignal(userId$, { initialValue: null });
  }

  private fetchUser(id: number): void {
    this.isLoading.set(true);
    this.isError.set(false);
    this.user.set(null);

    this.userService.getUser(id).pipe(
      delay(100),
      tap(user => {
        this.user.set(user);
        this.isLoading.set(false);
      }),
      catchError(() => {
        this.notification.error('Error', 'Failed to load user');
        this.isError.set(true);
        this.isLoading.set(false);
        return of(null);
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }
}

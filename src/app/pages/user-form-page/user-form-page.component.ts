import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  Signal,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { catchError, delay, map, of, tap } from 'rxjs';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzPageHeaderComponent } from 'ng-zorro-antd/page-header';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzSkeletonComponent } from 'ng-zorro-antd/skeleton';
import { NzAvatarComponent } from 'ng-zorro-antd/avatar';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { UserService } from '@app/services';
import { USER_EDIT_SUFFIX, USER_ID_PARAM, USER_LIST_ROUTE } from '@app/routes';
import { UpdateUser } from '@app/models';
import { UserFormControls } from './user-form-controls.model';
import {latitudeValidator, longitudeValidator, phoneValidator, websiteValidator} from '@app/validators';

@Component({
  selector: 'app-user-form-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NzCardComponent,
    NzFormModule,
    NzInputModule,
    NzButtonComponent,
    NzPageHeaderComponent,
    NzIconDirective,
    NzSkeletonComponent,
    NzAvatarComponent,
    NzEmptyComponent,
    NzDividerComponent,
  ],
  templateUrl: './user-form-page.component.html',
  styleUrls: ['./user-form-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormPageComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private userService = inject(UserService);
  private notification = inject(NzNotificationService);
  private fb = inject(FormBuilder);

  private readonly userId: Signal<number | null>;
  readonly isEditMode: Signal<boolean>;

  protected form: FormGroup<UserFormControls>;
  protected isLoading = signal(false);
  protected isError = signal(false);
  protected isSaving = signal(false);

  protected readonly listRoute = USER_LIST_ROUTE;

  constructor() {
    this.userId = this.computeUserId();
    this.isEditMode = this.computeIsEditMode();
    this.form = this.buildForm();

    effect(() => {
      const id = this.userId();
      if (id !== null && this.isEditMode()) {
        this.loadUser(id);
      }
    });
  }

  private buildForm(): FormGroup<UserFormControls> {
    return this.fb.group<UserFormControls>({
      name: this.fb.control('', { validators: [Validators.required, Validators.minLength(3)], nonNullable: true }),
      username: this.fb.control('', { validators: [Validators.required, Validators.minLength(3)], nonNullable: true }),
      email: this.fb.control('', { validators: [Validators.required, Validators.email], nonNullable: true }),
      phone: this.fb.control('', { validators: [phoneValidator()], nonNullable: true }),
      website: this.fb.control('', { validators: [websiteValidator()], nonNullable: true }),
      address: this.fb.group({
        street: this.fb.control('', { nonNullable: true }),
        suite: this.fb.control('', { nonNullable: true }),
        city: this.fb.control('', { nonNullable: true }),
        zipcode: this.fb.control('', { nonNullable: true }),
        geo: this.fb.group({
          lat: this.fb.control('', { validators: [latitudeValidator()], nonNullable: true }),
          lng: this.fb.control('', { validators: [longitudeValidator()], nonNullable: true }),
        }),
      }),
      company: this.fb.group({
        name: this.fb.control('', { nonNullable: true }),
        catchPhrase: this.fb.control('', { nonNullable: true }),
        bs: this.fb.control('', { nonNullable: true }),
      }),
    });
  }

  private loadUser(id: number): void {
    this.isLoading.set(true);
    this.isError.set(false);
    this.userService.getUser(id).pipe(
      delay(100),
      tap(user => {
        const { id, ...updateUser } = user;
        this.form.patchValue(updateUser satisfies UpdateUser);
        this.isLoading.set(false);
      }),
      catchError(() => {
        this.notification.error('Error', 'Failed to load user data');
        this.isError.set(true);
        this.isLoading.set(false);
        return of(null);
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }

    this.isSaving.set(true);
    const rawValue = this.form.getRawValue() as UpdateUser; // UserFormControls гарантирует точное соответствие

    const request$ = this.isEditMode()
      ? this.userService.updateUser(this.userId()!, rawValue)
      : this.userService.createUser(rawValue);

    request$.pipe(
      tap(() => {
        const content = `User ${this.isEditMode() ? 'updated' : 'created'} successfully`;
        this.notification.success('Success', content);
        this.router.navigate([USER_LIST_ROUTE]);
      }),
      catchError(() => {
        this.notification.error('Error', 'Failed to save user');
        this.isSaving.set(false);
        return of(null);
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  protected getAvatarLetter(): string {
    const name = this.form.controls.name.value;
    return name ? name.charAt(0).toUpperCase() : '?';
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

  private computeIsEditMode(): Signal<boolean> {
    const isEditMode$ = this.route.url.pipe(
      map(segments => segments.some(s => s.path === USER_EDIT_SUFFIX))
    );

    return toSignal(isEditMode$, { initialValue: false });
  }
}

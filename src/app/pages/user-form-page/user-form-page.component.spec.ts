/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { of } from 'rxjs';
import { UserFormPageComponent } from './user-form-page.component';
import { UserService } from '@app/services';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  ArrowLeftOutline,
  BankOutline,
  EditOutline,
  EnvironmentOutline,
  PlusOutline,
  UserOutline,
} from '@ant-design/icons-angular/icons';

describe('UserFormPageComponent', () => {
  let userService: Record<string, jest.Mock>;
  let notificationService: Record<string, jest.Mock>;
  let router: Router;

  async function setup(isEdit: boolean) {
    const urlSegments = isEdit ? [{ path: 'edit' }] : [];
    const paramMap = isEdit ? new Map([['id', '1']]) : new Map();

    userService = {
      getUser: jest.fn().mockReturnValue(
        of({
          id: 1,
          name: 'Edit Me',
          username: 'edit',
          email: 'edit@test.com',
          phone: '555-1234',
          website: 'edit.com',
          address: {
            street: 'edit st',
            suite: '1',
            city: 'edit city',
            zipcode: '00000',
            geo: { lat: '1', lng: '1' },
          },
          company: { name: 'Edit Corp', catchPhrase: 'edit', bs: 'edit' },
        }),
      ),
      createUser: jest.fn().mockReturnValue(of({ id: 2 })),
      updateUser: jest.fn().mockReturnValue(of({ id: 1 })),
    };

    notificationService = {
      success: jest.fn(),
      error: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [UserFormPageComponent],
      providers: [
        provideAnimationsAsync(),
        provideHttpClient(),
        provideRouter([]),
        provideNzIcons([
          UserOutline,
          EditOutline,
          ArrowLeftOutline,
          PlusOutline,
          EnvironmentOutline,
          BankOutline,
        ]),
        { provide: UserService, useValue: userService },
        { provide: NzNotificationService, useValue: notificationService },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(paramMap),
            url: of(urlSegments),
          },
        },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate');
  }

  describe('create mode', () => {
    it('should be in create mode', async () => {
      await setup(false);
      const fixture = TestBed.createComponent(UserFormPageComponent);
      const component = fixture.componentInstance as any;
      fixture.detectChanges();
      await fixture.whenStable();
      expect(component.isEditMode()).toBe(false);
      expect(fixture.nativeElement.textContent).toContain('Create User');
    });

    it('should show validation errors for required fields', async () => {
      await setup(false);
      const fixture = TestBed.createComponent(UserFormPageComponent);
      const component = fixture.componentInstance as any;
      fixture.detectChanges();
      await fixture.whenStable();

      component.form.controls.name.setValue('');
      component.form.controls.username.setValue('');
      component.form.controls.email.setValue('');
      fixture.detectChanges();
      await fixture.whenStable();
      component.onSubmit();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.form.invalid).toBe(true);
      const errors = fixture.nativeElement.querySelectorAll(
        '.ant-form-item-explain-error',
      );
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should call createUser on valid submit', async () => {
      await setup(false);
      const fixture = TestBed.createComponent(UserFormPageComponent);
      const component = fixture.componentInstance as any;
      fixture.detectChanges();
      await fixture.whenStable();

      component.form.patchValue({
        name: 'New User',
        username: 'new',
        email: 'new@test.com',
        phone: '1234567',
        website: 'new.com',
        address: {
          street: '123 St',
          suite: '1',
          city: 'City',
          zipcode: '00000',
          geo: { lat: '0', lng: '0' },
        },
        company: { name: 'Corp', catchPhrase: 'phrase', bs: 'bs' },
      });
      fixture.detectChanges();
      await fixture.whenStable();
      expect(component.form.valid).toBe(true);
      component.onSubmit();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(userService['createUser']).toHaveBeenCalled();
      expect(notificationService['success']).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['users']);
    });
  });

  describe('edit mode', () => {
    it('should be in edit mode and load user data', async () => {
      await setup(true);
      const fixture = TestBed.createComponent(UserFormPageComponent);
      const component = fixture.componentInstance as any;
      fixture.detectChanges();
      await new Promise((resolve) => setTimeout(resolve, 150));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.isEditMode()).toBe(true);
      expect(component.form.controls.name.value).toBe('Edit Me');
    });

    it('should call updateUser on valid submit', async () => {
      await setup(true);
      const fixture = TestBed.createComponent(UserFormPageComponent);
      const component = fixture.componentInstance as any;
      fixture.detectChanges();
      await new Promise((resolve) => setTimeout(resolve, 150));
      fixture.detectChanges();
      await fixture.whenStable();

      component.form.patchValue({
        name: 'Updated Name',
        phone: '1234567',
      });
      fixture.detectChanges();
      await fixture.whenStable();
      expect(component.form.valid).toBe(true);
      component.onSubmit();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(userService['updateUser']).toHaveBeenCalledWith(
        1,
        expect.objectContaining({ name: 'Updated Name' }),
      );
      expect(notificationService['success']).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['users']);
    });
  });
});

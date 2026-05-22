import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { of, throwError } from 'rxjs';
import { UserDetailPageComponent } from './user-detail-page.component';
import { UserService } from '@app/services';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  ArrowLeftOutline,
  BankOutline,
  EditOutline,
  EnvironmentOutline,
  UserOutline,
} from '@ant-design/icons-angular/icons';

const mockUser = {
  id: 1,
  name: 'Test User',
  username: 'testuser',
  email: 'test@test.com',
  phone: '555-1234',
  website: 'test.com',
  address: {
    street: '123 Test St',
    suite: 'Apt 1',
    city: 'Test City',
    zipcode: '12345',
    geo: { lat: '0', lng: '0' },
  },
  company: {
    name: 'Test Corp',
    catchPhrase: 'We test',
    bs: 'testing',
  },
};

describe('UserDetailPageComponent', () => {
  let fixture: ComponentFixture<UserDetailPageComponent>;
  let userService: { getUser: jest.Mock };
  let notificationService: { success: jest.Mock; error: jest.Mock };
  let router: Router;

  async function setup(routeId: string, userObs = of(mockUser)) {
    userService = {
      getUser: jest.fn().mockReturnValue(userObs),
    };
    notificationService = {
      success: jest.fn(),
      error: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [UserDetailPageComponent],
      providers: [
        provideAnimationsAsync(),
        provideHttpClient(),
        provideRouter([]),
        provideNzIcons([
          UserOutline,
          EditOutline,
          ArrowLeftOutline,
          EnvironmentOutline,
          BankOutline,
        ]),
        { provide: UserService, useValue: userService },
        { provide: NzNotificationService, useValue: notificationService },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(new Map([['id', routeId]])),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailPageComponent);
    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate');
    fixture.detectChanges();
    await new Promise((resolve) => setTimeout(resolve, 150));
    fixture.detectChanges();
  }

  it('should create and display user details', async () => {
    await setup('1');
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Test User');
    expect(text).toContain('555-1234');
    expect(text).toContain('Test Corp');
  });

  it('should show error notification and empty state on failure', async () => {
    await setup(
      '1',
      throwError(() => new Error('Not found')),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const component = fixture.componentInstance as any;
    expect(notificationService.error).toHaveBeenCalled();
    expect(component.isError()).toBe(true);
    expect(fixture.nativeElement.querySelector('nz-empty')).toBeTruthy();
  });
});

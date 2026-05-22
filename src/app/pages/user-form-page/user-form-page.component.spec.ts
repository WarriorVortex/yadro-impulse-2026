import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import {
  ArrowLeftOutline,
  BankOutline,
  EditOutline,
  EnvironmentOutline,
  PlusOutline,
  UserOutline,
} from '@ant-design/icons-angular/icons';
import { of } from 'rxjs';
import { UserFormPageComponent } from './user-form-page.component';
import { UserService } from '@app/services';
import { NzNotificationService } from 'ng-zorro-antd/notification';

describe('UserFormPageComponent', () => {
  let component: UserFormPageComponent;
  let fixture: ComponentFixture<UserFormPageComponent>;

  const mockUserService = {
    getUser: () => of(null),
    createUser: () => of(null),
    updateUser: () => of(null),
  };

  const mockNotification = {
    success: jest.fn(),
    error: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormPageComponent],
      providers: [
        provideAnimationsAsync(),
        provideHttpClient(),
        provideNzIcons([
          UserOutline,
          EditOutline,
          ArrowLeftOutline,
          PlusOutline,
          EnvironmentOutline,
          BankOutline,
        ]),
        { provide: UserService, useValue: mockUserService },
        { provide: NzNotificationService, useValue: mockNotification },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(new Map()),
            url: of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    await fixture.whenStable();
    expect(component).toBeTruthy();
  });
});

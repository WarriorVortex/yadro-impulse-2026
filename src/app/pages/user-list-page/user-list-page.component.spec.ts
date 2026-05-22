import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import {
  PlusOutline,
  SearchOutline,
  EditOutline,
  DeleteOutline,
  UserOutline,
  ArrowLeftOutline,
} from '@ant-design/icons-angular/icons';
import { of } from 'rxjs';
import { UserListPageComponent } from './user-list-page.component';
import { UserService } from '@app/services';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { User } from '@app/models';

describe('UserListPageComponent', () => {
  let component: UserListPageComponent;
  let fixture: ComponentFixture<UserListPageComponent>;

  const mockUsers = [
    {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      address: {
        city: 'New York',
        street: '123 Main St',
        suite: 'Apt 1',
        zipcode: '10001',
        geo: { lat: '0', lng: '0' },
      },
      phone: '123-456',
      website: 'john.com',
      company: { name: 'Acme', catchPhrase: 'We do things', bs: 'bs' },
    },
  ];

  const mockUserService = {
    getUsers: () => of(mockUsers),
    filterUsers: (users: User[]) => of(users),
    deleteUser: () => of(null),
  };

  const mockNotification = {
    success: jest.fn(),
    error: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListPageComponent],
      providers: [
        provideAnimationsAsync(),
        provideHttpClient(),
        provideRouter([]),
        provideNzIcons([
          PlusOutline,
          SearchOutline,
          EditOutline,
          DeleteOutline,
          UserOutline,
          ArrowLeftOutline,
        ]),
        { provide: UserService, useValue: mockUserService },
        { provide: NzNotificationService, useValue: mockNotification },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    await fixture.whenStable();
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Router } from '@angular/router';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { of } from 'rxjs';
import { UserListPageComponent } from './user-list-page.component';
import { UserService } from '@app/services';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  PlusOutline,
  SearchOutline,
  EditOutline,
  DeleteOutline,
  UserOutline,
  ArrowLeftOutline,
} from '@ant-design/icons-angular/icons';

const mockUsers = [
  {
    id: 1,
    name: 'Alpha',
    username: 'alpha',
    email: 'alpha@test.com',
    address: {
      city: 'NYC',
      street: '1st',
      suite: 'A',
      zipcode: '10001',
      geo: { lat: '0', lng: '0' },
    },
    phone: '1111111',
    website: 'a.com',
    company: { name: 'Corp A', catchPhrase: 'A', bs: 'a' },
  },
  {
    id: 2,
    name: 'Beta',
    username: 'beta',
    email: 'beta@test.com',
    address: {
      city: 'LA',
      street: '2nd',
      suite: 'B',
      zipcode: '90001',
      geo: { lat: '1', lng: '1' },
    },
    phone: '2222222',
    website: 'b.com',
    company: { name: 'Corp B', catchPhrase: 'B', bs: 'b' },
  },
];

describe('UserListPageComponent', () => {
  let component: any;
  let fixture: ComponentFixture<UserListPageComponent>;
  let userService: any;
  let notificationService: any;
  let router: Router;

  beforeEach(async () => {
    userService = {
      getUsers: jest.fn().mockReturnValue(of([...mockUsers])),
      filterUsers: jest.fn((users: any[], params: any) => {
        const term = params.search.toLowerCase();
        return of(
          users.filter(
            (u: any) =>
              u.name.toLowerCase().includes(term) ||
              u.email.toLowerCase().includes(term),
          ),
        );
      }),
      deleteUser: jest.fn().mockReturnValue(of(null)),
    };

    notificationService = {
      success: jest.fn(),
      error: jest.fn(),
    };

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
        { provide: UserService, useValue: userService },
        { provide: NzNotificationService, useValue: notificationService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListPageComponent);
    component = fixture.componentInstance as any;
    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate');
    fixture.detectChanges();
    await new Promise((resolve) => setTimeout(resolve, 300));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users and display them', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);
    expect(fixture.nativeElement.textContent).toContain('Alpha');
    expect(fixture.nativeElement.textContent).toContain('Beta');
  });

  it('should filter users by name when search term is set', async () => {
    component.search.set('Beta');
    fixture.detectChanges();
    await new Promise((resolve) => setTimeout(resolve, 350));
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(1);
    expect(rows[0].textContent).toContain('Beta');
  });

  it('should paginate correctly', async () => {
    component.pageSize.set(1);
    fixture.detectChanges();
    await new Promise((resolve) => setTimeout(resolve, 350));
    fixture.detectChanges();

    let rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(1);
    expect(rows[0].textContent).toContain('Alpha');

    component.currentPage.set(2);
    fixture.detectChanges();
    await new Promise((resolve) => setTimeout(resolve, 50));
    fixture.detectChanges();

    rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(1);
    expect(rows[0].textContent).toContain('Beta');
  });

  it('should delete a user and reload list', async () => {
    component.deleteUser(1);
    fixture.detectChanges();
    await new Promise((resolve) => setTimeout(resolve, 300));
    fixture.detectChanges();

    expect(userService.deleteUser).toHaveBeenCalledWith(1);
    expect(notificationService.success).toHaveBeenCalledWith(
      'Success',
      'User was deleted',
    );
    expect(userService.getUsers).toHaveBeenCalledTimes(2);
  });
});

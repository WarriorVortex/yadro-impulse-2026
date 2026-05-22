import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import {
  ArrowLeftOutline,
  EditOutline,
  UserOutline,
} from '@ant-design/icons-angular/icons';
import { of } from 'rxjs';
import { UserDetailPageComponent } from './user-detail-page.component';
import { UserService } from '@app/services';
import { NzNotificationService } from 'ng-zorro-antd/notification';

describe('UserDetailPageComponent', () => {
  let component: UserDetailPageComponent;
  let fixture: ComponentFixture<UserDetailPageComponent>;

  beforeEach(async () => {
    const mockUserService = {
      getUser: () =>
        of({
          id: 1,
          name: 'Test',
          username: 'test',
          email: 'test@test.com',
          phone: '123',
          website: 'test.com',
          address: {
            street: 'street',
            suite: 'suite',
            city: 'city',
            zipcode: '000',
            geo: { lat: '0', lng: '0' },
          },
          company: {
            name: 'Test Inc.',
            catchPhrase: 'phrase',
            bs: 'bs',
          },
        }),
    };

    const mockNotificationService = {
      error: jest.fn(),
      success: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [UserDetailPageComponent],
      providers: [
        provideAnimationsAsync(),
        provideHttpClient(),
        provideNzIcons([UserOutline, EditOutline, ArrowLeftOutline]),
        { provide: UserService, useValue: mockUserService },
        { provide: NzNotificationService, useValue: mockNotificationService },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(new Map([['id', '1']])),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    await fixture.whenStable();
    expect(component).toBeTruthy();
  });
});

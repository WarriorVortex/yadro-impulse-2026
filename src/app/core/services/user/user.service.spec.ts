import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { USER_FILTER_PREDICATE } from './user.service.token';
import { User } from '@app/models';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const mockUser: User = {
    id: 1,
    name: 'Test User',
    username: 'testuser',
    email: 'test@example.com',
    address: {
      street: 'Test Street',
      suite: 'Suite 1',
      city: 'Test City',
      zipcode: '12345',
      geo: { lat: '0', lng: '0' },
    },
    phone: '123-456',
    website: 'test.com',
    company: {
      name: 'Test Company',
      catchPhrase: 'Test phrase',
      bs: 'test bs',
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: USER_FILTER_PREDICATE,
          useValue: () => true,
        },
      ],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get users', () => {
    service.getUsers().subscribe((users) => {
      expect(users).toEqual([mockUser]);
    });

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/users',
    );
    expect(req.request.method).toBe('GET');
    req.flush([mockUser]);
  });

  it('should get a single user', () => {
    service.getUser(1).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/users/1',
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should create a user', () => {
    service.createUser(mockUser).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/users',
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });

  it('should update a user', () => {
    service.updateUser(1, mockUser).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/users/1',
    );
    expect(req.request.method).toBe('PUT');
    req.flush(mockUser);
  });

  it('should delete a user', () => {
    service.deleteUser(1).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/users/1',
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormPersonalComponent } from './user-form-personal.component';

describe('UserFormPersonalComponent', () => {
  let component: UserFormPersonalComponent;
  let fixture: ComponentFixture<UserFormPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormPersonalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

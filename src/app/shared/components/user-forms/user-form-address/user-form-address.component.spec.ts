import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormAddressComponent } from './user-form-address.component';

describe('UserFormAddressComponent', () => {
  let component: UserFormAddressComponent;
  let fixture: ComponentFixture<UserFormAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFormAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

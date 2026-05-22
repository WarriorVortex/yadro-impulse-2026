import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UserFormAddressComponent } from './user-form-address.component';
import { Address } from '@app/models';
import { FormControlsOf } from '@app/utils';

type AddressFormControls = FormControlsOf<Address>;

describe('UserFormAddressComponent', () => {
  let component: UserFormAddressComponent;
  let fixture: ComponentFixture<UserFormAddressComponent>;
  let formGroup: FormGroup<AddressFormControls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormAddressComponent],
      providers: [provideAnimationsAsync()],
    }).compileComponents();

    const fb = new FormBuilder();
    formGroup = fb.group<AddressFormControls>({
      street: fb.control('', { nonNullable: true }),
      suite: fb.control('', { nonNullable: true }),
      city: fb.control('', { nonNullable: true }),
      zipcode: fb.control('', { nonNullable: true }),
      geo: fb.group({
        lat: fb.control('', { nonNullable: true }),
        lng: fb.control('', { nonNullable: true }),
      }),
    });

    fixture = TestBed.createComponent(UserFormAddressComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('formGroup', formGroup);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

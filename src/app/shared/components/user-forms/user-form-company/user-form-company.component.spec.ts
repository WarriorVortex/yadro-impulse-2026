import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UserFormCompanyComponent } from './user-form-company.component';
import { Company } from '@app/models';
import { FormControlsOf } from '@app/utils';

type CompanyFormControls = FormControlsOf<Company>;

describe('UserFormCompanyComponent', () => {
  let component: UserFormCompanyComponent;
  let fixture: ComponentFixture<UserFormCompanyComponent>;
  let formGroup: FormGroup<CompanyFormControls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormCompanyComponent],
      providers: [provideAnimationsAsync()],
    }).compileComponents();

    const fb = new FormBuilder();
    formGroup = fb.group<CompanyFormControls>({
      name: fb.control('', { nonNullable: true }),
      catchPhrase: fb.control('', { nonNullable: true }),
      bs: fb.control('', { nonNullable: true }),
    });

    fixture = TestBed.createComponent(UserFormCompanyComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('formGroup', formGroup);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

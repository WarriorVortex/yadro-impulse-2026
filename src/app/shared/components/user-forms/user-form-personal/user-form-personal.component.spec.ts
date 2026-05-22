import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { UserOutline } from '@ant-design/icons-angular/icons';
import { UserFormPersonalComponent } from './user-form-personal.component';
import { PersonalUserInfo } from '@app/models';
import { FormControlsOf } from '@app/utils';

type UserPersonalControls = FormControlsOf<PersonalUserInfo>;

describe('UserFormPersonalComponent', () => {
  let component: UserFormPersonalComponent;
  let fixture: ComponentFixture<UserFormPersonalComponent>;
  let formGroup: FormGroup<UserPersonalControls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormPersonalComponent],
      providers: [provideAnimationsAsync(), provideNzIcons([UserOutline])],
    }).compileComponents();

    const fb = new FormBuilder();
    formGroup = fb.group<UserPersonalControls>({
      name: fb.control('', { nonNullable: true }),
      username: fb.control('', { nonNullable: true }),
      email: fb.control('', { nonNullable: true }),
      phone: fb.control('', { nonNullable: true }),
      website: fb.control('', { nonNullable: true }),
    });

    fixture = TestBed.createComponent(UserFormPersonalComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('formGroup', formGroup);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

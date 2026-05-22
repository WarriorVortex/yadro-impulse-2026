import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormCompanyComponent } from './user-form-company.component';

describe('UserFormCompanyComponent', () => {
  let component: UserFormCompanyComponent;
  let fixture: ComponentFixture<UserFormCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormCompanyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

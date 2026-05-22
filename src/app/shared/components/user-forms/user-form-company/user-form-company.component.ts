import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { Company } from '@app/models';
import { FormControlsOf } from '@app/utils';

type CompanyFormControls = FormControlsOf<Company>;

@Component({
  selector: 'app-user-form-company',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzDividerComponent,
  ],
  templateUrl: './user-form-company.component.html',
  styleUrls: ['./user-form-company.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormCompanyComponent {
  formGroup = input.required<FormGroup<CompanyFormControls>>();
}

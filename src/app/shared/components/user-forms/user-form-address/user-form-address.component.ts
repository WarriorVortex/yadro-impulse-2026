import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { Address } from '@app/models';
import { FormControlsOf } from '@app/utils';

type AddressFormControls = FormControlsOf<Address>;

@Component({
  selector: 'app-user-form-address',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzDividerComponent,
  ],
  templateUrl: './user-form-address.component.html',
  styleUrls: ['./user-form-address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormAddressComponent {
  formGroup = input.required<FormGroup<AddressFormControls>>();
}

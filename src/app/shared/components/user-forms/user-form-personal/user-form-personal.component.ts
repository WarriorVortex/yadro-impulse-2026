import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {PersonalUserInfo} from '@app/models';
import { FormControlsOf } from '@app/utils';

type UserPersonalControls = FormControlsOf<PersonalUserInfo>;

@Component({
  selector: 'app-user-form-personal',
  standalone: true,
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzIconDirective],
  templateUrl: './user-form-personal.component.html',
  styleUrls: ['./user-form-personal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormPersonalComponent {
  formGroup = input.required<FormGroup<UserPersonalControls>>();
}

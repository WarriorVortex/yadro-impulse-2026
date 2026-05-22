import {FormControl, FormGroup} from '@angular/forms';
import {UpdateUser} from '@app/models';

type FormControlsOf<T> = {
  [K in keyof T]: T[K] extends Record<string, any>
    ? FormGroup<FormControlsOf<T[K]>>
    : FormControl<T[K]>;
};

export type UserFormControls = FormControlsOf<UpdateUser>;

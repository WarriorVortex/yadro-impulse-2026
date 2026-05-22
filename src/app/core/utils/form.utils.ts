import {FormControl, FormGroup} from '@angular/forms';

export type FormControlsOf<T> = {
  [K in keyof T]: T[K] extends Record<string, any>
    ? FormGroup<FormControlsOf<T[K]>>
    : FormControl<T[K]>;
};

import { FormControl, FormGroup } from '@angular/forms';

export type FormControlsOf<T> = {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  [K in keyof T]: T[K] extends Record<string, any>
    ? FormGroup<FormControlsOf<T[K]>>
    : FormControl<T[K]>;
};

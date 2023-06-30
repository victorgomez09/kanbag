import { FormControl, FormGroup } from '@angular/forms';

export type ModelFormGroup<T> = FormGroup<{
  [K in keyof T]: FormControl<T[K]>;
}>;

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T
}
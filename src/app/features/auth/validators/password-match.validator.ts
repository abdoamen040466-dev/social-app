import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordMatcher(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const rePassword = control.get('rePassword')?.value;

  if (rePassword === password) return null;
  else return { passwordMismatch: true };
}

import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { passwordMatcher } from '../../validators/password-match.validator';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  readonly registerForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      username: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9_]+'),
        Validators.maxLength(30),
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dateOfBirth: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
      ]),
      rePassword: new FormControl('', [Validators.required /*, Validators*/]),
    },
    { validators: passwordMatcher },
  );

  get input() {
    return this.registerForm.controls;
  }

  submitForm(): void {
    console.log(this.registerForm);
    // console.log(this.registerForm.valid);
    // console.log(this.registerForm.errors);
    // console.log(this.registerForm.value);
    // console.log(this.registerForm.get('password'));
  }
}

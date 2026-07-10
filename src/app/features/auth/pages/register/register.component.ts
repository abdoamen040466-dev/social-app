import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  readonly registerForm = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    dateOfBirth: new FormControl(''),
    gender: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
  });

  submitForm(): void {
    console.log(this.registerForm.value);
  }
}

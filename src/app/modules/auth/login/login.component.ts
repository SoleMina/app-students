import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  get usernameControl() {
    return this.loginForm.get('username');
  }
  get passwordControl() {
    return this.loginForm.get('username');
  }
  get usernameControlIsValid() {
    return this.usernameControl?.valid && this.usernameControl.touched;
  }
  get usernameControlIsInvalid() {
    return this.usernameControl?.invalid && this.usernameControl.touched;
  }

  get usernameErrors() {
    return this.usernameControl?.errors;
  }
  get passwordErrors() {
    return this.passwordControl?.errors;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const formDataLogin = this.loginForm.value;
    console.log(formDataLogin, 'formDataLogin');
  }
}

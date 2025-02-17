import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  get usernameControl() {
    return this.loginForm.get('email');
  }
  get passwordControl() {
    return this.loginForm.get('password');
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
    const formDataLogin = this.loginForm.value;
    console.log(formDataLogin, 'formDataLogin');
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    } else {
      this.authService.login(this.loginForm.value);
    }
  }
}

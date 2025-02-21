import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { SharedModule } from '../../../shared/shared.module';
import { Validators } from '@angular/forms';

describe('LoginComponent', () => {
  let loginComponent: LoginComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [SharedModule],
    }).compileComponents();
  });

  loginComponent = TestBed.createComponent(LoginComponent).componentInstance;

  it('Should create login component', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('Email & password should be required', () => {
    const emailControl = loginComponent.loginForm.get('email');
    const passwordControl = loginComponent.loginForm.get('password');

    expect([
      emailControl?.hasValidator(Validators.required),
      emailControl?.hasValidator(Validators.email),
    ]).toEqual([true, true]);
    expect(passwordControl?.hasValidator(Validators.required)).toBe(true);
  });

  it('When form is invalid, it should call loginForm.MarkAllAsTouched', () => {
    loginComponent.loginForm.setValue({
      email: '',
      password: '',
    });

    const spyOnMarkAllAsTouched = spyOn(
      loginComponent.loginForm,
      'markAllAsTouched'
    );

    loginComponent.onSubmit();

    expect(spyOnMarkAllAsTouched).toHaveBeenCalledTimes(1);
  });

  it('If form is valid, call login authService', () => {
    loginComponent.loginForm.setValue({
      email: 'email@gmail.com',
      password: '0123456',
    });

    const spyOnLogin = spyOn((loginComponent as any).authService, 'login');

    loginComponent.onSubmit();

    expect(spyOnLogin).toHaveBeenCalledTimes(1);
  });
});

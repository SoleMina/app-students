import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MockProvider } from 'ng-mocks';

describe('AuthService', () => {
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, MockProvider(Router)],
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('AuthService should be instanced', () => {
    expect(authService).toBeTruthy();
  });

  it('A sucessfull login, should have a authenticated user, should have accesss token and should redirect to home', () => {
    const spyOnNavigate = spyOn(router, 'navigate');
    authService.login({
      email: 'admin@gmail.com',
      password: '0123456',
    });

    authService.authUser$.subscribe({
      next: (authUser) => {
        expect(authUser).toBeTruthy();
        expect(localStorage.getItem('access_token')).toBeTruthy();
        expect(spyOnNavigate).toHaveBeenCalled();
        expect(spyOnNavigate).toHaveBeenCalledWith(['dashboard/students']);
      },
    });
  });
});

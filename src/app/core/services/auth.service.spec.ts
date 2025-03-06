import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MockProvider } from 'ng-mocks';
import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { environment } from '../../../environments/environment.development';
import { User } from '../../modules/dashboard/pages/users/models';

describe('AuthService', () => {
  let authService: AuthService;
  let router: Router;
  let httpTestingController: HttpTestingController;

  const initialState = {
    auth: {
      authUser: null,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        AuthService,
        MockProvider(Router),
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    localStorage.clear();
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('AuthService should be instanced', () => {
    expect(authService).toBeTruthy();
  });

  it('A sucessfull login, should have a authenticated user, should have accesss token and should redirect to home', () => {
    const spyOnNavigate = spyOn(router, 'navigate');

    const loginData = {
      email: 'admin@gmail.com',
      password: '0123456',
    };

    const mockResponse: User[] = [
      {
        email: 'test@gmail.com',
        password: '0123456',
        id: '001',
        name: 'test',
        accessToken: 'hjjhgjghgjh',
        role: 'Admin',
      },
    ];
    authService.login(loginData, () => {
      expect(localStorage.getItem('access_token')).toBeTruthy();
      expect(spyOnNavigate).toHaveBeenCalledWith(['dashboard/students']);
    });

    httpTestingController
      .expectOne({
        method: 'GET',
        url: `${environment.baseApiUrl}/users?email=${loginData.email}&password=${loginData.password}`,
      })
      .flush(mockResponse);

    // authService.authUser$.subscribe({
    //   next: (authUser) => {
    //     expect(authUser).toBeTruthy();
    //     expect(localStorage.getItem('access_token')).toBeTruthy();
    //     expect(spyOnNavigate).toHaveBeenCalled();
    //     expect(spyOnNavigate).toHaveBeenCalledWith(['dashboard/students']);
    //   },
    // });
  });

  it('An unsucessfull login should show a message with "email or password invalid"', () => {
    const spyOnAlert = spyOn(window, 'alert');

    const loginData = {
      email: 'admin@gmail.com',
      password: '0123456',
    };

    const mockResponse: User[] = [];

    authService.login(loginData, () => {
      expect(spyOnAlert).toHaveBeenCalledWith(['Email or password invalid']);
    });

    httpTestingController
      .expectOne({
        method: 'GET',
        url: `${environment.baseApiUrl}/users?email=${loginData.email}&password=${loginData.password}`,
      })
      .flush(mockResponse);
  });
});
